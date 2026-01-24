// src/types/payment.ts

/* ------------------ PAYMENT METHODS ------------------ */

export type PaymentMethod =
  | 'cash'
  | 'paypal'
  | 'visa'
  | 'mastercard'

/* ------------------ PAYMENT DETAILS ------------------ */

export interface CardPaymentDetails {
  cardNumber: string
  expiry: string
  cvc: string
}

export interface PaypalPaymentDetails {
  paypalEmail: string
}

/* ------------------ PAYMENT DATA ------------------ */
/**
 * Discriminated union
 * TypeScript will auto-narrow based on `method`
 */
export type PaymentData =
  | {
      method: 'cash'
      details: null
    }
  | {
      method: 'paypal'
      details: PaypalPaymentDetails
    }
  | {
      method: 'visa' | 'mastercard'
      details: CardPaymentDetails
    }
