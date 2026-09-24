/**
 * Dependency-free HTML sanitizer for CMS-authored rich text.
 *
 * Used wherever API content is injected via `dangerouslySetInnerHTML`
 * (FAQ answers, workshop/clay descriptions). It is allowlist-based:
 * anything not explicitly permitted is dropped.
 *
 * Isomorphic on purpose - it is pure string processing, so it behaves
 * identically during SSR and in the browser.
 *
 * Scope: this defends against markup injected through the CMS
 * (stored XSS). It is intentionally strict rather than clever.
 */

/** Formatting tags the CMS editor is expected to emit. */
const ALLOWED_TAGS = new Set([
  'p', 'br', 'hr', 'span', 'div',
  'b', 'strong', 'i', 'em', 'u', 's', 'sub', 'sup', 'small', 'mark',
  'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'blockquote', 'pre', 'code',
  'a', 'img',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
])

/** Tags dropped together with everything inside them. */
const DROP_WITH_CONTENT = new Set([
  'script', 'style', 'iframe', 'object', 'embed', 'form', 'input',
  'button', 'select', 'option', 'textarea', 'svg', 'math', 'template',
  'noscript', 'link', 'meta', 'base', 'head', 'title', 'frame', 'frameset',
])

/** Tags that never have a closing partner. */
const VOID_TAGS = new Set(['br', 'hr', 'img', 'col'])

/** Attributes allowed on every permitted tag. */
const GLOBAL_ATTRS = new Set(['title', 'dir', 'lang'])

/** Attributes allowed on specific tags only. */
const TAG_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height']),
  td: new Set(['colspan', 'rowspan']),
  th: new Set(['colspan', 'rowspan', 'scope']),
  col: new Set(['span']),
  colgroup: new Set(['span']),
}

/**
 * Strips characters browsers ignore while resolving a URL scheme, so
 * `java\tscript:` and friends cannot smuggle a scheme past the check.
 * Written with numeric code points rather than escape sequences to keep
 * literal control characters out of this source file.
 */
function stripUrlNoise(value: string): string {
  let out = ''

  for (const char of value) {
    const code = char.charCodeAt(0)

    const isNoise =
      code <= 0x20 ||
      code === 0xa0 ||
      code === 0x1680 ||
      (code >= 0x2000 && code <= 0x200a) ||
      code === 0x2028 ||
      code === 0x2029 ||
      code === 0x202f ||
      code === 0x205f ||
      code === 0x3000

    if (!isNoise) out += char
  }

  return out
}

/**
 * Rejects javascript:, data:, vbscript: and friends, including
 * obfuscation via control characters or HTML entities.
 */
function isSafeUrl(value: string): boolean {
  const normalized = stripUrlNoise(value)
    // Decode numeric/named entities that could hide a scheme.
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&colon;/gi, ':')
    .replace(/&Tab;|&NewLine;/gi, '')

  // Anything carrying an explicit scheme must be on the allowlist.
  if (/^[a-z][a-z0-9+.-]*:/i.test(normalized)) {
    return /^(?:https?|mailto|tel):/i.test(normalized)
  }

  // Relative, anchor, query and scheme-relative URLs are fine.
  return true
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

type Attribute = { name: string; value: string }

/**
 * Parses the attribute section of a tag, honouring quoted values so a
 * `>` inside an attribute cannot terminate the tag early.
 * Returns the attributes and the index just past the closing `>`.
 */
function parseAttributes(
  html: string,
  start: number
): { attrs: Attribute[]; end: number } {
  const attrs: Attribute[] = []
  let i = start

  while (i < html.length) {
    while (i < html.length && /\s/.test(html[i])) i++

    if (i >= html.length) break

    if (html[i] === '>') {
      i++
      break
    }

    if (html[i] === '/' && html[i + 1] === '>') {
      i += 2
      break
    }

    // Attribute name
    const nameStart = i
    while (i < html.length && !/[\s=/>]/.test(html[i])) i++
    const name = html.slice(nameStart, i)

    if (!name) {
      i++
      continue
    }

    while (i < html.length && /\s/.test(html[i])) i++

    let value = ''

    if (html[i] === '=') {
      i++
      while (i < html.length && /\s/.test(html[i])) i++

      const quote = html[i]

      if (quote === '"' || quote === "'") {
        i++
        const valueStart = i
        while (i < html.length && html[i] !== quote) i++
        value = html.slice(valueStart, i)
        i++
      } else {
        const valueStart = i
        while (i < html.length && !/[\s>]/.test(html[i])) i++
        value = html.slice(valueStart, i)
      }
    }

    attrs.push({ name, value })
  }

  return { attrs, end: i }
}

/** Finds the end of a drop-with-content block, e.g. everything up to </script>. */
function skipToClosingTag(html: string, tagName: string, from: number): number {
  const closing = new RegExp('</\\s*' + tagName + '\\s*>', 'i')
  const rest = html.slice(from)
  const match = rest.match(closing)

  if (!match || match.index === undefined) {
    // Unclosed dangerous tag: drop the remainder entirely.
    return html.length
  }

  return from + match.index + match[0].length
}

function buildOpenTag(tagName: string, attrs: Attribute[]): string {
  const allowed = TAG_ATTRS[tagName]
  const kept: string[] = []
  let hasTarget = false

  for (const attr of attrs) {
    const name = attr.name.toLowerCase()

    // Event handlers and anything else that can carry script.
    if (name.startsWith('on')) continue
    if (name === 'style' || name === 'srcset' || name === 'formaction') continue
    // data-*/aria-* are inert, but we stay strict and allowlist only.
    if (!GLOBAL_ATTRS.has(name) && !allowed?.has(name)) continue

    if ((name === 'href' || name === 'src') && !isSafeUrl(attr.value)) continue

    if (name === 'target') hasTarget = true

    kept.push(
      attr.value ? name + '="' + escapeAttribute(attr.value) + '"' : name
    )
  }

  // Never leave a target="_blank" link able to reach window.opener.
  if (tagName === 'a' && hasTarget) {
    const withoutRel = kept.filter((a) => !a.toLowerCase().startsWith('rel='))
    withoutRel.push('rel="noopener noreferrer"')
    return '<' + tagName + ' ' + withoutRel.join(' ') + '>'
  }

  const suffix = VOID_TAGS.has(tagName) ? ' /' : ''

  return '<' + tagName + (kept.length ? ' ' + kept.join(' ') : '') + suffix + '>'
}

/**
 * Strips scripts, event handlers, dangerous URL schemes and unknown tags
 * from CMS HTML, preserving ordinary formatting markup.
 *
 * @param html Untrusted HTML from the API.
 * @returns HTML safe to pass to `dangerouslySetInnerHTML`.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return ''

  let out = ''
  let i = 0

  while (i < html.length) {
    const lt = html.indexOf('<', i)

    if (lt === -1) {
      out += html.slice(i)
      break
    }

    out += html.slice(i, lt)

    // Comments, doctype and processing instructions.
    if (html.startsWith('<!--', lt)) {
      const close = html.indexOf('-->', lt + 4)
      i = close === -1 ? html.length : close + 3
      continue
    }

    if (html[lt + 1] === '!' || html[lt + 1] === '?') {
      const close = html.indexOf('>', lt + 2)
      i = close === -1 ? html.length : close + 1
      continue
    }

    const isClosing = html[lt + 1] === '/'
    const nameStart = lt + (isClosing ? 2 : 1)

    let nameEnd = nameStart
    while (nameEnd < html.length && /[a-z0-9:-]/i.test(html[nameEnd])) nameEnd++

    const tagName = html.slice(nameStart, nameEnd).toLowerCase()

    // A stray "<" that is not a tag - emit it escaped.
    if (!tagName) {
      out += '&lt;'
      i = lt + 1
      continue
    }

    if (isClosing) {
      const close = html.indexOf('>', nameEnd)
      i = close === -1 ? html.length : close + 1

      if (ALLOWED_TAGS.has(tagName) && !VOID_TAGS.has(tagName)) {
        out += '</' + tagName + '>'
      }

      continue
    }

    const { attrs, end } = parseAttributes(html, nameEnd)

    if (DROP_WITH_CONTENT.has(tagName)) {
      i = skipToClosingTag(html, tagName, end)
      continue
    }

    if (ALLOWED_TAGS.has(tagName)) {
      out += buildOpenTag(tagName, attrs)
    }

    // Unknown-but-harmless tag: markup dropped, inner content kept.
    i = end
  }

  return out
}

export default sanitizeHtml
