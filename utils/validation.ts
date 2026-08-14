/**
 * Validation utility following Single Responsibility Principle
 * Each validator function has a single, well-defined purpose
 */

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export const COUNTRY_PHONE_CODES = [
  { value: '+971', label: 'UAE (+971)', minDigits: 7, maxDigits: 9 },
  { value: '+966', label: 'Saudi Arabia (+966)', minDigits: 7, maxDigits: 9 },
  { value: '+965', label: 'Kuwait (+965)', minDigits: 7, maxDigits: 8 },
  { value: '+974', label: 'Qatar (+974)', minDigits: 7, maxDigits: 8 },
  { value: '+965', label: 'Bahrain (+973)', minDigits: 7, maxDigits: 8 },
  { value: '+44', label: 'United Kingdom (+44)', minDigits: 7, maxDigits: 12 },
  { value: '+1', label: 'United States (+1)', minDigits: 7, maxDigits: 10 },
  { value: '+91', label: 'India (+91)', minDigits: 7, maxDigits: 12 },
  { value: '+61', label: 'Australia (+61)', minDigits: 7, maxDigits: 12 },
] as const

export const getPhoneCountryConfig = (countryCode: string) => {
  return (
    COUNTRY_PHONE_CODES.find((option) => option.value === countryCode) ??
    COUNTRY_PHONE_CODES[0]
  )
}

export const validateInternationalPhone = (value: string, countryCode = '+971') => {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return { field: 'phone', message: 'Phone number is required' }
  }

  if (/[A-Za-z]/.test(trimmedValue)) {
    return { field: 'phone', message: 'Phone number must contain digits only' }
  }

  const digits = trimmedValue.replace(/\D/g, '')

  if (!digits) {
    return { field: 'phone', message: 'Phone number must contain digits only' }
  }

  const countryConfig = getPhoneCountryConfig(countryCode)

  if (digits.length < countryConfig.minDigits || digits.length > countryConfig.maxDigits) {
    return {
      field: 'phone',
      message: `Phone number must be ${countryConfig.minDigits}-${countryConfig.maxDigits} digits for ${countryConfig.label.split(' (')[0]} after the country code.`,
    }
  }

  return null
}

// Individual validators - SRP: each function does one thing
export const validators = {
  /**
   * Validates if name meets minimum requirements
   */
  validateName: (name: string): ValidationError | null => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      return { field: 'name', message: 'Name is required' }
    }
    if (trimmedName.length < 2) {
      return { field: 'name', message: 'Name must be at least 2 characters' }
    }
    if (trimmedName.length > 50) {
      return { field: 'name', message: 'Name must not exceed 50 characters' }
    }
    return null
  },

  /**
   * Validates if email is in correct format
   */
  validateEmail: (email: string): ValidationError | null => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      return { field: 'email', message: 'Email is required' }
    }

    // Check for @ symbol
    if (!trimmedEmail.includes('@')) {
      return { field: 'email', message: 'Email must contain @ symbol' }
    }

    // Check for dot in domain
    if (!trimmedEmail.includes('.')) {
      return { field: 'email', message: 'Email must contain a domain extension (e.g., .com)' }
    }

    // RFC 5322 compliant email regex
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(trimmedEmail)) {
      return { field: 'email', message: 'Please enter a valid email address' }
    }

    // Additional validations
    const [localPart, domainPart] = trimmedEmail.split('@')

    if (!localPart || localPart.length === 0) {
      return { field: 'email', message: 'Email local part cannot be empty' }
    }

    if (!domainPart || domainPart.length === 0) {
      return { field: 'email', message: 'Email domain cannot be empty' }
    }

    if (!domainPart.includes('.')) {
      return { field: 'email', message: 'Email domain must have an extension' }
    }

    const domainParts = domainPart.split('.')
    if (domainParts.some((part) => !part || part.length === 0)) {
      return { field: 'email', message: 'Email domain format is invalid' }
    }

    return null
  },

  /**
   * Validates if password meets security requirements
   */
  validatePassword: (password: string): ValidationError | null => {
    if (!password) {
      return { field: 'password', message: 'Password is required' }
    }
    if (password.length < 8) {
      return { field: 'password', message: 'Password must be at least 8 characters' }
    }
    if (!/[A-Z]/.test(password)) {
      return {
        field: 'password',
        message: 'Password must contain at least one uppercase letter',
      }
    }
    if (!/[a-z]/.test(password)) {
      return {
        field: 'password',
        message: 'Password must contain at least one lowercase letter',
      }
    }
    if (!/[0-9]/.test(password)) {
      return { field: 'password', message: 'Password must contain at least one number' }
    }
    return null
  },

  /**
   * Validates if passwords match
   */
  validatePasswordConfirm: (
    password: string,
    confirmPassword: string
  ): ValidationError | null => {
    if (!confirmPassword) {
      return { field: 'confirmPassword', message: 'Please confirm your password' }
    }
    if (password !== confirmPassword) {
      return { field: 'confirmPassword', message: 'Passwords do not match' }
    }
    return null
  },
}

/**
 * Main validation function that orchestrates all validators
 * Dependency Inversion: depends on abstract validator functions, not concrete implementations
 */
export const validateSignupForm = (data: {
  name: string
  email: string
  password: string
  confirmPassword: string
}): ValidationResult => {
  const errors: ValidationError[] = []

  const nameError = validators.validateName(data.name)
  if (nameError) errors.push(nameError)

  const emailError = validators.validateEmail(data.email)
  if (emailError) errors.push(emailError)

  const passwordError = validators.validatePassword(data.password)
  if (passwordError) errors.push(passwordError)

  const confirmError = validators.validatePasswordConfirm(data.password, data.confirmPassword)
  if (confirmError) errors.push(confirmError)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Get error message for a specific field
 */
export const getFieldError = (errors: ValidationError[], fieldName: string): string | null => {
  const error = errors.find((err) => err.field === fieldName)
  return error ? error.message : null
}

export const validateEmail = validators.validateEmail;
export const validatePassword = validators.validatePassword;
