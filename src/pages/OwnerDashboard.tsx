
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  DollarSign, 
  Users, 
  Calendar, 
  Settings, 
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  Star,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const OwnerDashboard = () => {
  const mockResorts = [
    {
      id: 1,
      name: "Ocean Breeze Resort",
      location: "Miami Beach",
      status: "active",
      bookings: 45,
      revenue: 12500,
      rating: 4.8
    },
    {
      id: 2,
      name: "Mountain View Paradise",
      location: "Colorado",
      status: "active",
      bookings: 32,
      revenue: 8900,
      rating: 4.6
    }
  ];

  const mockBookings = [
    {
      id: 1,
      guestName: "John Smith",
      resort: "Ocean Breeze Resort",
      date: "2024-01-15",
      amount: 299,
      status: "confirmed"
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      resort: "Mountain View Paradise",
      date: "2024-01-16",
      amount: 199,
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your resort business</p>
          </div>
          <div className="flex space-x-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Resort
            </Button>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Resorts</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold">$21,400</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Occupancy Rate</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="resorts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="resorts">My Resorts</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="resorts">
            <Card>
              <CardHeader>
                <CardTitle>Resort Management</CardTitle>
                <CardDescription>Manage your resort listings and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResorts.map((resort) => (
                    <div key={resort.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-semibold">{resort.name}</h3>
                            <Badge variant={resort.status === 'active' ? 'default' : 'secondary'}>
                              {resort.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-gray-600 mt-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {resort.location}
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-600">Monthly Bookings</p>
                              <p className="text-lg font-bold">{resort.bookings}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Revenue</p>
                              <p className="text-lg font-bold">${resort.revenue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Rating</p>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-lg font-bold">{resort.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>View and manage customer reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.guestName}</h3>
                        <p className="text-sm text-gray-600">{booking.resort}</p>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">${booking.amount}</p>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          {booking.status === 'pending' && (
                            <Button size="sm">Approve</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Revenue Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                  <CardDescription>Booking volume over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Booking Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Resorts</CardTitle>
                  <CardDescription>Resort performance comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockResorts.map((resort, index) => (
                      <div key={resort.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{resort.name}</p>
                          <p className="text-sm text-gray-600">{resort.bookings} bookings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${resort.revenue.toLocaleString()}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-sm">{resort.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Demographics</CardTitle>
                  <CardDescription>Visitor insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Age Groups</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>18-25</span>
                          <span>25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>26-35</span>
                          <span>45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>36-50</span>
                          <span>30%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>View earnings and payout information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <h3 className="font-semibold text-green-800">Available Balance</h3>
                    <p className="text-2xl font-bold text-green-600">$5,240.00</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h3 className="font-semibold text-blue-800">Pending Payouts</h3>
                    <p className="text-2xl font-bold text-blue-600">$1,890.00</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-800">Total Earnings</h3>
                    <p className="text-2xl font-bold text-gray-600">$45,230.00</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Payout Methods</h4>
                    <Button variant="outline">Add Payout Method</Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Bank Account •••• 1234</p>
                        <p className="text-sm text-gray-600">Primary payout method</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Button className="w-full">Request Payout</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your business account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Business Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Name</label>
                      <input className="w-full p-3 border rounded-lg" defaultValue="Paradise Resorts LLC" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Email</label>
                      <input className="w-full p-3 border rounded-lg" defaultValue="owner@paradiseresorts.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input className="w-full p-3 border rounded-lg" defaultValue="+1 234 567 8900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tax ID</label>
                      <input className="w-full p-3 border rounded-lg" defaultValue="XX-XXXXXXX" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>New booking notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Marketing communications</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;
