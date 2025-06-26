import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Ensure you have your Stripe secret key in environment variables
// For local development, you can use a .env.local file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10', // Use the latest API version
});

export async function POST(request: Request) {
  try {
    const { amount, currency = 'usd', items } = await request.json();

    // Basic validation
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }
    if (typeof currency !== 'string' || currency.length !== 3) {
      return NextResponse.json({ error: 'Invalid currency' }, { status: 400 });
    }

    // In a real application, you might want to:
    // 1. Verify the items and calculate the amount on the server-side
    //    to prevent manipulation from the client.
    // 2. Save booking details to your database before creating the payment intent.
    // 3. Include metadata related to the booking in the payment intent.

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      // You can add metadata here if needed, e.g., bookingId
      // metadata: { bookingId: 'your_booking_id_here' },
      description: 'Resort Booking Payment', // Optional: description for the payment
      statement_descriptor: 'ResortBooking', // Optional: shows up on customer's bank statement (max 22 chars)
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    // Differentiate between Stripe errors and other errors
    if (error.type && error.type.startsWith('Stripe')) {
      return NextResponse.json({ error: error.message || 'Stripe API error' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Optional: Add a GET handler if you need to check the status or for other purposes
// export async function GET() {
//   return NextResponse.json({ message: 'This endpoint is for creating payment intents via POST.' });
// }
