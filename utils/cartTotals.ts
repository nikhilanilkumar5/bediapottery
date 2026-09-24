import { CartData } from '@/services/cart.service'

/**
 * Single source of truth for cart money.
 *
 * The API is authoritative: a booking's amount is calculated server-side and
 * that is what the payment gateway charges, so the cart and checkout screens
 * display the server's numbers rather than recomputing them.
 *
 * The fallback exists for the guest cart, which is assembled in the browser
 * and has no server-calculated tax yet.
 */

/** UAE VAT, used only when the server has not supplied a tax amount. */
export const DEFAULT_VAT_RATE = 0.05

export interface CartTotals {
  /** Net of tax, matching the server's `totalAmount`. */
  subtotal: number
  /** Whole-number percentage, for labels such as "VAT (5%)". */
  taxPercent: number
  taxAmount: number
  grandTotal: number
  /** True when the figures were derived locally rather than sent by the API. */
  isEstimated: boolean
}

function toFiniteNumber(value: unknown): number | null {
  const parsed = typeof value === 'string' ? Number(value) : value

  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null
}

/**
 * The API may express tax as a rate (0.05) or a percentage (5).
 * Normalise to a percentage for display.
 */
function normalisePercent(value: number | null): number | null {
  if (value === null) return null

  return value > 0 && value <= 1 ? value * 100 : value
}

/**
 * Derives the totals for a cart.
 *
 * Server values are used whenever the API has supplied a tax amount;
 * otherwise the totals are estimated at {@link DEFAULT_VAT_RATE}. The estimate
 * is never allowed to understate tax relative to what the API reported.
 */
export function getCartTotals(cart?: CartData | null): CartTotals {
  const subtotal = toFiniteNumber(cart?.totalAmount) ?? 0

  const serverTaxAmount = toFiniteNumber(cart?.taxAmount)
  const serverGrandTotal = toFiniteNumber(cart?.grandTotal)
  const serverTaxPercent = normalisePercent(toFiniteNumber(cart?.taxPercent))

  // Trust the server only once it has actually calculated tax. A missing or
  // zero tax amount means the guest cart, so fall back rather than show no VAT.
  if (serverTaxAmount !== null && serverTaxAmount > 0) {
    return {
      subtotal,
      taxPercent: serverTaxPercent ?? DEFAULT_VAT_RATE * 100,
      taxAmount: serverTaxAmount,
      grandTotal: serverGrandTotal ?? subtotal + serverTaxAmount,
      isEstimated: false,
    }
  }

  const taxAmount = subtotal * DEFAULT_VAT_RATE

  return {
    subtotal,
    taxPercent: DEFAULT_VAT_RATE * 100,
    taxAmount,
    grandTotal: subtotal + taxAmount,
    isEstimated: true,
  }
}

/** Formats a percentage without trailing zeros, e.g. 5 -> "5", 7.5 -> "7.5". */
export function formatPercent(percent: number): string {
  return String(Number(percent.toFixed(2)))
}

export default getCartTotals
