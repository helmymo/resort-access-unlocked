import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for resorts
  const mockResorts = [
    {
      id: '1',
      name: 'Sunset Paradise Resort',
      location: 'Maldives',
      description: 'A beautiful resort with stunning sunset views.',
      pricePerNight: 300,
      amenities: ['Pool', 'Spa', 'Restaurant', 'Beach Access'],
    },
    {
      id: '2',
      name: 'Mountain Peak Lodge',
      location: 'Aspen, Colorado',
      description: 'Cozy lodge with ski-in/ski-out access.',
      pricePerNight: 450,
      amenities: ['Ski Storage', 'Hot Tub', 'Fireplace', 'Restaurant'],
    },
    {
      id: '3',
      name: 'Urban Oasis Suites',
      location: 'New York City',
      description: 'Modern suites in the heart of the city.',
      pricePerNight: 250,
      amenities: ['Gym', 'Rooftop Bar', 'Concierge', 'Business Center'],
    },
    {
      id: '4',
      name: 'Coastal Breeze Villas',
      location: 'Santorini, Greece',
      description: 'Charming villas overlooking the Aegean Sea.',
      pricePerNight: 380,
      amenities: ['Private Balcony', 'Infinity Pool', 'Sea View', 'Kitchenette'],
    }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(mockResorts);
}
