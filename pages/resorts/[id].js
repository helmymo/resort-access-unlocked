import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const ResortPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [resortData, setResortData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availability, setAvailability] = useState({});
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    if (id) {
      // Mock fetching resort data
      setResortData({
        name: `Resort ${id}`,
        description: `This is a beautiful resort, perfect for your next getaway. Resort ID: ${id}`,
      });

      // Mock fetching availability data
      // In a real application, this would be an API call:
      // fetch(`/api/resorts/${id}/availability`)
      //   .then(res => res.json())
      //   .then(data => setAvailability(data));
      const mockAvailability = {
        '2024-03-15': { type: 'full-day', price: 100 },
        '2024-03-16': { type: 'hourly', slots: ['09:00', '10:00', '14:00', '15:00'], pricePerHour: 20 },
        '2024-03-17': { type: 'full-day', price: 120 },
        '2024-03-20': { type: 'hourly', slots: ['10:00', '11:00', '16:00'], pricePerHour: 25 },
        // Add more mock data as needed
      };
      setAvailability(mockAvailability);
    }
  }, [id]);

  // TODO: Handle date and time slot selection in Step 5
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot when date changes
    // Price calculation will be triggered by useEffect watching selectedDate and selectedTimeSlot
  };

  const handleTimeSlotChange = (slot) => {
    setSelectedTimeSlot(slot);
    // Price calculation will be triggered by useEffect watching selectedDate and selectedTimeSlot
  };

  const getAvailableSlotsForSelectedDate = () => {
    if (!selectedDate) return null;
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const dayAvailability = availability[dateString];

    if (dayAvailability && dayAvailability.type === 'hourly') {
      return dayAvailability.slots;
    }
    return null;
  };

  useEffect(() => {
    if (!selectedDate) {
      setCalculatedPrice(0);
      return;
    }

    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const dayAvailability = availability[dateString];

    if (!dayAvailability) {
      setCalculatedPrice(0);
      return;
    }

    if (dayAvailability.type === 'full-day') {
      setCalculatedPrice(dayAvailability.price);
      setSelectedTimeSlot(null); // Ensure no time slot is selected for full-day bookings
    } else if (dayAvailability.type === 'hourly') {
      if (selectedTimeSlot) {
        // Assuming one hour block for simplicity.
        // Real-world might involve calculating duration if multiple blocks can be selected.
        setCalculatedPrice(dayAvailability.pricePerHour);
      } else {
        setCalculatedPrice(0); // No time slot selected yet
      }
    } else {
      setCalculatedPrice(0);
    }
  }, [selectedDate, selectedTimeSlot, availability]);

  if (!resortData) {
    return <div>Loading resort information...</div>;
  }

  return (
    <div>
      <h1>{resortData.name}</h1>
      <p>{resortData.description}</p>
      <div>
        <h2>Select Date and Time</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={(date) => {
            const dateString = format(date, 'yyyy-MM-dd');
            return availability[dateString] !== undefined;
          }}
          inline // Show the calendar directly on the page
        />
        {getAvailableSlotsForSelectedDate() && (
          <div>
            <h4>Available Time Slots:</h4>
            {getAvailableSlotsForSelectedDate().map((slot) => (
              <button
                key={slot}
                onClick={() => handleTimeSlotChange(slot)}
                style={{ fontWeight: selectedTimeSlot === slot ? 'bold' : 'normal', margin: '5px' }}
              >
                {slot}
              </button>
            ))}
          </div>
        )}
        {selectedDate && availability[format(selectedDate, 'yyyy-MM-dd')]?.type === 'full-day' && (
            <p>Full day booking selected for {format(selectedDate, 'MMMM d, yyyy')}.</p>
        )}
      </div>
      <div>
        <h3>Calculated Price: ${calculatedPrice}</h3>
      </div>
    </div>
  );
};

export default ResortPage;
