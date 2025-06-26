import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  CreditCard, 
  Calendar, 
  Heart, 
  Settings, 
  Bell,
  MapPin,
  Clock,
  Star,
  QrCode,
  Gift,
  Users as UsersIcon,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LoyaltyRewards from '@/components/LoyaltyRewards';
import Wishlist from '@/components/Wishlist';

const UserDashboard = () => {
  const mockBookings = [
    {
      id: 1,
      resortName: "Ocean Breeze Resort",
      date: "2024-01-15",
      time: "10:00 AM - 6:00 PM",
      status: "confirmed",
      qrCode: "QR123456"
    },
    {
      id: 2,
      resortName: "Mountain View Paradise",
      date: "2024-01-20",
      time: "2:00 PM - 8:00 PM",
      status: "pending",
      qrCode: "QR789012"
    }
  ];

  const mockFavorites = [
    {
      id: 1,
      name: "Sunset Beach Resort",
      location: "Maldives",
      rating: 4.8,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Alpine Lodge",
      location: "Switzerland",
      rating: 4.9,
      image: "/placeholder.svg"
    }
  ];

  const personalizedRecommendations = [
    {
      id: 1,
      name: "Ocean Vista Resort",
      location: "Miami",
      rating: 4.9,
      reason: "Similar to Ocean Breeze Resort",
      price: 199,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Tropical Paradise",
      location: "Key West",
      rating: 4.7,
      reason: "Popular with families",
      price: 149,
      image: "/placeholder.svg"
    }
  ];

  const groupBookings = [
    {
      id: 1,
      resortName: "Family Fun Resort",
      date: "2024-02-10",
      groupSize: 6,
      organizer: "You",
      status: "pending_payment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, John Doe</p>
          </div>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Reviews Written</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Current Plan</p>
                  <p className="text-lg font-bold">Premium</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personalized Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>For You</CardTitle>
            <CardDescription>Resorts recommended based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalizedRecommendations.map((resort) => (
                <div key={resort.id} className="border rounded-lg p-4">
                  <img src={resort.image} alt={resort.name} className="w-full h-32 object-cover rounded mb-3" />
                  <h3 className="font-semibold">{resort.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {resort.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {resort.rating}
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">{resort.reason}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold">${resort.price}/day</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View and manage your resort reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.resortName}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date}
                          <Clock className="h-4 w-4 ml-4 mr-1" />
                          {booking.time}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                        {booking.status === 'confirmed' && (
                          <Button size="sm" variant="outline">
                            <QrCode className="h-4 w-4 mr-2" />
                            View QR
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Wishlist />
          </TabsContent>

          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UsersIcon className="h-5 w-5 mr-2" />
                  Group Bookings
                </CardTitle>
                <CardDescription>Manage shared bookings with friends and family</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{booking.resortName}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                            <UsersIcon className="h-4 w-4 ml-4 mr-1" />
                            {booking.groupSize} people
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Organized by {booking.organizer}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant="secondary">{booking.status.replace('_', ' ')}</Badge>
                          <Button size="sm">Manage</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    Create Group Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <LoyaltyRewards />
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription & Billing</CardTitle>
                <CardDescription>Manage your subscription plan and payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Premium Plan</h3>
                      <p className="text-gray-600">Unlimited bookings, priority support</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$29.99</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Payment Methods</h4>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 1234</p>
                          <p className="text-sm text-gray-600">Expires 12/26</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-3">Add New Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input className="w-full p-3 border rounded-lg" defaultValue="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input className="w-full p-3 border rounded-lg" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input className="w-full p-3 border rounded-lg" defaultValue="+1 234 567 8900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input className="w-full p-3 border rounded-lg" defaultValue="New York, NY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {["Swimming", "Relaxation", "Family Activities", "Water Sports", "Dining"].map((interest) => (
                        <Badge key={interest} variant="outline" className="cursor-pointer">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="mt-4">Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Concierge Support
                  </CardTitle>
                  <CardDescription>Get personalized assistance for your bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full">Start Chat with Support</Button>
                    <Button variant="outline" className="w-full">View FAQ</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account preferences and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Booking confirmations</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Price drop alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>New resort notifications</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Promotional offers</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reminder notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Privacy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Profile visibility</span>
                      <select className="border rounded px-3 py-1">
                        <option>Public</option>
                        <option>Private</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Share analytics</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Location sharing</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
