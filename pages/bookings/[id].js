import { useRouter } from 'next/router';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';

const BookingConfirmationPage = () => {
  const router = useRouter();
  const { id: bookingId } = router.query; // Get booking ID from URL query parameter
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  // Simulate booking confirmation logic
  useEffect(() => {
    if (bookingId) {
      // In a real application, you would fetch booking details
      // from your backend here and confirm the booking status.
      // For this example, we'll just simulate it.
      console.log(`Fetching booking details for ID: ${bookingId}`);
      // Simulate a delay for API call
      const timer = setTimeout(() => {
        setIsBookingConfirmed(true);
        console.log(`Booking ${bookingId} confirmed.`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [bookingId]);

  if (!bookingId) {
    return <div>Loading booking details...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>Booking Confirmation</h1>
      {isBookingConfirmed ? (
        <>
          <p>Your booking with ID: <strong>{bookingId}</strong> is confirmed!</p>
          <p>Scan the QR code below to view your booking details:</p>
          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}>
            <QRCodeCanvas value={bookingId} size={256} level="H" />
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.8em', color: '#555' }}>
            Ensure this QR code is clear and scannable.
          </p>
        </>
      ) : (
        <p>Confirming your booking (ID: {bookingId})...</p>
      )}
    </div>
  );
};

export default BookingConfirmationPage;
