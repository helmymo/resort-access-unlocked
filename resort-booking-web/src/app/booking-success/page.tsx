"use client";

import React from 'react';
import Link from 'next/link';

const BookingSuccessPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: 'green', marginBottom: '20px' }}>Payment Successful!</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Thank you for your booking. Your payment has been processed successfully.
      </p>
      <p style={{ marginBottom: '15px' }}>
        A confirmation email with your booking details has been sent to your registered email address.
      </p>
      <p style={{ marginBottom: '30px' }}>
        We look forward to welcoming you!
      </p>
      <div>
        <Link href="/" style={{ textDecoration: 'none', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', marginRight: '10px' }}>
          Go to Homepage
        </Link>
        {/* Optional: Link to a user's booking dashboard if available */}
        {/* <Link href="/my-bookings" style={{ textDecoration: 'none', padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', borderRadius: '5px' }}>
          View My Bookings
        </Link> */}
      </div>
    </div>
  );
};

export default BookingSuccessPage;
