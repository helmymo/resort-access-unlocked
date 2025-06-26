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
  MapPin,
  MessageCircle,
  UserPlus,
  Megaphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';
import PromotionsManager from '@/components/PromotionsManager';

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

  const staffMembers = [
    { id: 1, name: "Sarah Johnson", role: "Manager", resort: "Ocean Breeze Resort", active: true },
    { id: 2, name: "Mike Chen", role: "Check-in Staff", resort: "Mountain View Paradise", active: true },
    { id: 3, name: "Lisa Garcia", role: "Finance", resort: "All Resorts", active: false }
  ];

  const resortEvents = [
    {
      id: 1,
      title: "Live Jazz Night",
      resort: "Ocean Breeze Resort",
      date: "2024-01-20",
      time: "19:00",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Sunset Yoga Session",
      resort: "Mountain View Paradise",
      date: "2024-01-22",
      time: "18:00",
      status: "published"
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
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="resorts">Resorts</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
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
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="promotions">
            <PromotionsManager />
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Staff Management
                    </CardTitle>
                    <CardDescription>Manage staff accounts and permissions</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Staff Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffMembers.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{staff.name}</h3>
                        <p className="text-sm text-gray-600">{staff.role} • {staff.resort}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={staff.active ? 'default' : 'secondary'}>
                          {staff.active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Resort Events
                    </CardTitle>
                    <CardDescription>Schedule and manage resort events and activities</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resortEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.resort}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date} at {event.time}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {event.status === 'scheduled' && (
                          <Button size="sm">
                            <Megaphone className="h-4 w-4 mr-1" />
                            Publish
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>View earnings and payout information with dynamic pricing tools</CardDescription>
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
                  <h4 className="font-semibold mb-3">Dynamic Pricing</h4>
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Pricing Rules</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Peak Season (Jun-Aug)</span>
                              <Badge>+25%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Weekends</span>
                              <Badge>+15%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>High Demand</span>
                              <Badge>+20%</Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Revenue Optimization</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Revenue Increase</span>
                              <span className="font-bold text-green-600">+18.5%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Occupancy Rate</span>
                              <span className="font-bold">78%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4">Configure Pricing Rules</Button>
                    </CardContent>
                  </Card>
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
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Manage your business account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Communication Hub
                  </CardTitle>
                  <CardDescription>Manage visitor communications and announcements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col items-center justify-center">
                      <MessageCircle className="h-6 w-6 mb-2" />
                      Direct Messages
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Megaphone className="h-6 w-6 mb-2" />
                      Send Announcement
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Recent Messages</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>John D. - Ocean Breeze Resort</span>
                        <span className="text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sarah M. - Mountain View Paradise</span>
                        <span className="text-gray-500">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;
