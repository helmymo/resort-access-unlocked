
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, QrCode, User, Search } from 'lucide-react';

const ResortDetail = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);

  // Mock resort data - in real app would fetch from API
  const resort = {
    id: 1,
    name: "Azure Beach Resort",
    location: "Maldives",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1200&q=80"
    ],
    price: 299,
    rating: 4.8,
    reviews: 324,
    description: "Experience luxury at its finest in our overwater villas with stunning ocean views. Azure Beach Resort offers an unparalleled tropical paradise with world-class amenities and personalized service.",
    amenities: [
      "Private Beach", "Infinity Pool", "Spa & Wellness", "Fine Dining", 
      "Water Sports", "Fitness Center", "Concierge Service", "WiFi", 
      "Room Service", "Airport Transfer"
    ],
    nearbyAttractions: [
      "Coral Reef Snorkeling - 0.2 miles",
      "Sunset Point - 0.5 miles", 
      "Local Fish Market - 2 miles",
      "Cultural Village - 3 miles"
    ],
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      pets: "Pet-friendly with additional fee",
      smoking: "Non-smoking property"
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ResortAccess
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/resorts" className="hover:text-blue-600">Resorts</Link>
            <span>/</span>
            <span className="text-gray-900">{resort.name}</span>
          </div>
        </nav>

        {/* Resort Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{resort.name}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span className="font-medium">{resort.rating}</span>
                  <span className="ml-1">({resort.reviews} reviews)</span>
                </div>
                <span>📍 {resort.location}</span>
              </div>
            </div>
            <div className="text-right mt-4 lg:mt-0">
              <div className="text-3xl font-bold text-blue-600">${resort.price}</div>
              <div className="text-gray-600">per night</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={resort.images[currentImageIndex]} 
                  alt={resort.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                  {resort.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {resort.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Resort Details Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">About this resort</h3>
                  <p className="text-gray-700 leading-relaxed">{resort.description}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3">What makes this place special</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Overwater villas with direct ocean access</li>
                    <li>• World-class spa with traditional treatments</li>
                    <li>• Michelin-starred dining experience</li>
                    <li>• Private beach with pristine white sand</li>
                    <li>• Complimentary water sports equipment</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-6">
                <h3 className="text-2xl font-bold mb-4">Resort Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {resort.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="mt-6">
                <h3 className="text-2xl font-bold mb-4">Location & Nearby</h3>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">
                    <span className="text-gray-500">Interactive Map Coming Soon</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Nearby Attractions</h4>
                    <ul className="space-y-1 text-gray-700">
                      {resort.nearbyAttractions.map((attraction, index) => (
                        <li key={index}>• {attraction}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="policies" className="mt-6">
                <h3 className="text-2xl font-bold mb-4">Resort Policies</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Check-in</h4>
                      <p className="text-gray-700">{resort.policies.checkIn}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Check-out</h4>
                      <p className="text-gray-700">{resort.policies.checkOut}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Cancellation Policy</h4>
                    <p className="text-gray-700">{resort.policies.cancellation}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Pet Policy</h4>
                    <p className="text-gray-700">{resort.policies.pets}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Smoking Policy</h4>
                    <p className="text-gray-700">{resort.policies.smoking}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  <span>${resort.price}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    Available
                  </Badge>
                </CardTitle>
                <CardDescription>per night</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-in Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Guests</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="number" 
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      min="1"
                      max="10"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Base price (1 night)</span>
                    <span>${resort.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>$29</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span>$45</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${resort.price + 29 + 45}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12">
                  Reserve Now
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  You won't be charged yet. Confirmation and QR code will be sent after booking.
                </p>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <QrCode className="w-4 h-4 mr-2" />
                    Digital Access Included
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Instant QR code generation</li>
                    <li>• Contactless check-in/out</li>
                    <li>• Resort amenity access</li>
                    <li>• 24/7 digital concierge</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Guest Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                date: "March 2024",
                comment: "Absolutely stunning resort! The overwater villa was incredible and the QR code access made everything so seamless. Will definitely return!"
              },
              {
                name: "Michael Chen",
                rating: 5,
                date: "February 2024",
                comment: "Perfect honeymoon destination. The staff was exceptional and the digital check-in process was so convenient. Highly recommended!"
              }
            ].map((review, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.date}</CardDescription>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortDetail;
