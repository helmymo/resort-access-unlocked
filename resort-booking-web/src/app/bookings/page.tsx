"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import for App Router
import { Button } from '@/components/ui/button'; // Assuming this path is correct
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'; // Assuming this path
import Link from 'next/link';

// Define a type for the booking data
interface Booking {
  id: string;
  resortName: string;
  resortId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string; // e.g., 'CONFIRMED', 'CANCELLED', 'COMPLETED'
  // Add a hypothetical field for cancellation policy for now
  // This should ideally come from the API or be derived based on dates and policy
  isCancelable?: boolean;
  cancelByDate?: string; // Example: '2024-12-31T23:59:59Z'
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API endpoint and authentication if needed
      const response = await fetch('/api/users/me/bookings');
      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      }
      const data = await response.json();
      // Add a mock isCancelable and cancelByDate for now
      const processedData = data.map((booking: Booking) => ({
        ...booking,
        // Example: cancelable if booking end date is more than 7 days from now
        isCancelable: new Date(booking.endDate).getTime() > Date.now() + 7 * 24 * 60 * 60 * 1000,
        cancelByDate: new Date(new Date(booking.startDate).getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() // Example: 2 days before start
      }));
      setBookings(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancelBooking = async (bookingId: string) => {
    // Confirmation dialog
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      // TODO: Replace with actual API endpoint and authentication
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'POST', // Or 'DELETE', depending on API design
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Failed to cancel booking: ${response.statusText}` }));
        throw new Error(errorData.message || `Failed to cancel booking: ${response.statusText}`);
      }
      // Refresh bookings list after cancellation
      alert("Booking cancelled successfully!");
      fetchBookings();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during cancellation.';
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Loading bookings...</p>
        {/* Consider adding a Skeleton loader here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <p>Error: {error}</p>
        <Button onClick={fetchBookings} className="mt-4">Try Again</Button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>You have no bookings.</p>
        <Link href="/resorts" passHref>
          <Button className="mt-4">Explore Resorts</Button>
        </Link>
      </div>
    );
  }

  const now = new Date();
  const currentBookings = bookings.filter(b => new Date(b.endDate) >= now && b.status !== 'CANCELLED');
  const pastBookings = bookings.filter(b => new Date(b.endDate) < now || b.status === 'CANCELLED');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

      {currentBookings.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Current Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBookings.map(booking => (
              <Card key={booking.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{booking.resortName}</CardTitle>
                  <CardDescription>Status: {booking.status}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p><strong>Dates:</strong> {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
                  <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
                  {booking.isCancelable && booking.cancelByDate && (
                    <p className="text-sm text-yellow-600">
                      Cancel by: {new Date(booking.cancelByDate).toLocaleDateString()} {new Date(booking.cancelByDate).toLocaleTimeString()}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Link href={`/bookings/${booking.id}`} passHref>
                    <Button variant="outline">View Details</Button>
                  </Link>
                  {booking.isCancelable && booking.status !== 'CANCELLED' && (
                    <Button variant="destructive" onClick={() => handleCancelBooking(booking.id)}>
                      Cancel Booking
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {pastBookings.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Past Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastBookings.map(booking => (
              <Card key={booking.id} className="opacity-75 flex flex-col">
                <CardHeader>
                  <CardTitle>{booking.resortName}</CardTitle>
                  <CardDescription>Status: {booking.status}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p><strong>Dates:</strong> {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
                  <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/bookings/${booking.id}`} passHref>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}
       {currentBookings.length === 0 && pastBookings.length === 0 && bookings.length > 0 && (
         <div className="text-center">
            <p>All your bookings are processed. Check current and past sections.</p>
         </div>
       )}
    </div>
  );
}
