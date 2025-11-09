/**
 * Stripe Checkout Service
 * Handles payment processing via Stripe
 */

import { loadStripe } from '@stripe/stripe-js';

// Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_2xqPCC52juI0mCoTGW22Er9X';
const API_BASE_URL = 'https://api.asso-letrousseau.com/api';

// Load Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export interface CheckoutItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
  printfulId?: number;
  kunakiProductId?: string;
  productType?: string;
  productId?: string;
  variantId?: string;
}

/**
 * Create Stripe Checkout Session and redirect
 */
export async function createCheckoutSession(
  items: CheckoutItem[],
  customerEmail?: string
): Promise<void> {
  try {
    console.log('🔵 Stripe Service - Creating checkout session');
    console.log('📦 Items:', items);
    console.log('📧 Email:', customerEmail);
    console.log('🌐 API URL:', `${API_BASE_URL}/stripe/create-checkout-session`);
    
    // Create checkout session
    const response = await fetch(`${API_BASE_URL}/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        customerEmail
      })
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Response error:', errorText);
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { message: errorText };
      }
      throw new Error(error.message || 'Failed to create checkout session');
    }

    const data = await response.json();
    console.log('✅ Response data:', data);
    const { url } = data;

    // Redirect to Stripe Checkout
    if (!url) {
      throw new Error('No checkout URL received');
    }
    
    console.log('🚀 Redirecting to:', url);
    window.location.href = url;
  } catch (error) {
    console.error('❌ Checkout error:', error);
    throw error;
  }
}

/**
 * Get checkout session details (for success page)
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/stripe/session/${sessionId}`);
    
    if (!response.ok) {
      throw new Error('Failed to retrieve session');
    }

    return await response.json();
  } catch (error) {
    console.error('Session retrieval error:', error);
    throw error;
  }
}

export default {
  createCheckoutSession,
  getCheckoutSession
};
