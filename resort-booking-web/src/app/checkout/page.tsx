"use client";

import React, { useState, useEffect } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation'; // For redirection

// IMPORTANT: Replace with your actual Stripe publishable key
// You can find this in your Stripe dashboard
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY';

if (STRIPE_PUBLISHABLE_KEY === 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY') {
  console.warn(
    'WARNING: Stripe publishable key is not set or is using the placeholder. ' +
    'Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your .env.local file.'
  );
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);
  const [email, setEmail] = useState(''); // Example: collect email for receipt

  // --- Configuration for amount and currency ---
  // In a real app, this would likely come from props, context, or a state management solution
  // based on the user's booking selection.
  const bookingAmount = 2500; // Amount in cents (e.g., $25.00)
  const bookingCurrency = 'usd'; // Currency code
  // ---

  useEffect(() => {
    console.log("Attempting to fetch client secret...");
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: bookingAmount,
        currency: bookingCurrency
        // You could also pass items or a bookingId here if your backend needs it
        // items: [{ id: 'resort-deluxe-room' }]
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(data => {
            // Construct a more informative error message
            const errorMessage = data.error || `Server error: ${res.status} ${res.statusText}`;
            console.error("API Error response:", data);
            throw new Error(errorMessage);
          });
        }
        return res.json();
      })
      .then((data) => {
        if (!data.clientSecret) {
          console.error("Client secret not found in response:", data);
          throw new Error("Client secret was not returned from the server.");
        }
        console.log("Client secret received:", data.clientSecret);
        setClientSecret(data.clientSecret);
      })
      .catch(apiError => {
        console.error("Error fetching client secret:", apiError);
        setError(`Failed to initialize payment: ${apiError.message}. Please ensure your backend is running and STRIPE_SECRET_KEY is set.`);
      });
  }, [bookingAmount, bookingCurrency]); // Re-fetch if amount/currency changes

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.error("Stripe.js has not loaded yet.");
      setError("Stripe.js has not loaded yet. Please try again in a moment.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found");
      setError("CardElement not found. Ensure Stripe Elements are correctly loaded.");
      setProcessing(false);
      return;
    }

    // Use a default name if not collecting billing details, or make it dynamic
    const billingDetails: Stripe.PaymentMethodCreateParams.BillingDetails = {
      name: 'Guest User', // Placeholder, ideally collect this
    };
    if (email) {
      billingDetails.email = email;
    }

    console.log("Confirming card payment with clientSecret:", clientSecret);
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: billingDetails,
      },
      receipt_email: email || undefined, // Send Stripe receipt if email is provided
    });

    if (stripeError) {
      console.error("Stripe Payment error:", stripeError);
      setError(stripeError.message ?? "An unknown error occurred during payment.");
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log("Payment Succeeded:", paymentIntent);
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      // Redirect to a success page
      router.push('/booking-success');
    } else {
      console.log("Payment not succeeded or requires action. Status:", paymentIntent?.status);
      setError(paymentIntent?.last_payment_error?.message || "Payment not successful or requires further action. Please try again.");
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Confirm your Booking & Pay</h2>

      {!succeeded && !clientSecret && !error && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#555' }}>Loading payment form...</div>
      )}

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', border: '1px solid red', borderRadius: '4px', backgroundColor: '#ffebee' }} role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {clientSecret && !succeeded && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
              Email for receipt (optional)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="card-element" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
              Credit or debit card
            </label>
            <CardElement id="card-element" options={cardElementOptions} />
          </div>

          <button
            type="submit"
            disabled={!stripe || processing || !clientSecret}
            style={{
              backgroundColor: processing || !stripe || !clientSecret ? '#a0a0a0' : '#007bff',
              color: 'white',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: processing || !stripe || !clientSecret ? 'not-allowed' : 'pointer',
              width: '100%',
              fontSize: '16px',
              fontWeight: 'bold',
              opacity: processing || !stripe || !clientSecret ? 0.7 : 1,
            }}
          >
            {processing ? 'Processing...' : `Pay ${bookingCurrency.toUpperCase()} ${(bookingAmount / 100).toFixed(2)}`}
          </button>
        </form>
      )}

      {succeeded && (
        <div style={{ color: 'green', textAlign: 'center', padding: '20px', border: '1px solid green', borderRadius: '4px', backgroundColor: '#e8f5e9' }}>
          <h3>Payment Successful!</h3>
          <p>Your booking is confirmed. You will be redirected shortly.</p>
        </div>
      )}
    </div>
  );
};

const CheckoutPage = () => {
  // Define options for Elements provider, including clientSecret when available
  // This is not strictly necessary for clientSecret to be passed here for confirmCardPayment,
  // but can be useful for other Element types or payment methods.
  // For this setup, clientSecret is primarily fetched and used within CheckoutForm.
  const [clientSecretForElements, setClientSecretForElements] = useState<string | undefined>(undefined);

  // This is a simplified way to pass clientSecret to Elements options.
  // In a more complex app, you might fetch it here or pass it down.
  // However, the current CheckoutForm fetches its own clientSecret.
  // So, this `options` object here is more illustrative if you expand payment methods.
  const options: StripeElementsOptions = {
    // clientSecret: clientSecretForElements, // Example if you were to set it here
    appearance: { theme: 'stripe' },
  };


  return (
    // It's important that Elements wraps any component that calls useStripe() or useElements()
    // stripePromise must be loaded Stripe object.
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
