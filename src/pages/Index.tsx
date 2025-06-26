
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredResorts = [
    {
      id: 1,
      name: "Azure Beach Resort",
      location: "Maldives",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
      price: 299,
      rating: 4.8,
      amenities: ["Private Beach", "Spa", "Pool", "Restaurant"]
    },
    {
      id: 2,
      name: "Mountain Vista Lodge",
      location: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
      price: 189,
      rating: 4.6,
      amenities: ["Mountain View", "Hiking", "Spa", "Fireplace"]
    },
    {
      id: 3,
      name: "Coastal Paradise Resort",
      location: "Hawaii",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
      price: 349,
      rating: 4.9,
      amenities: ["Ocean View", "Surfing", "Pool", "Beach Bar"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ResortAccess
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-800 via-blue-600 to-amber-600 bg-clip-text text-transparent">
            Unlock Paradise
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and book exclusive resorts worldwide with seamless access management. 
            Your next luxury escape is just a scan away.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Where do you want to go?" 
                    className="pl-10 h-12 border-gray-200 focus:border-blue-400"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="date" 
                    className="pl-10 h-12 border-gray-200 focus:border-blue-400"
                  />
                </div>
              </div>
              <div>
                <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Search Resorts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose ResortAccess?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Digital Access</h4>
              <p className="text-gray-600">Seamless check-in with secure QR codes. No more waiting in lines.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Flexible Booking</h4>
              <p className="text-gray-600">Book by the day or hour. Perfect for any schedule.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Premium Experience</h4>
              <p className="text-gray-600">Curated resorts with exclusive amenities and services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resorts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Resorts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredResorts.map((resort) => (
              <Card key={resort.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={resort.image} 
                    alt={resort.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                      ⭐ {resort.rating}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      ${resort.price}/night
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{resort.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    📍 {resort.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resort.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {resort.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resort.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Link to={`/resort/${resort.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Resort Experience?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers and resort owners who trust ResortAccess for seamless booking and access management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Start as Visitor
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                List Your Resort
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">ResortAccess</h4>
              </div>
              <p className="text-gray-400">
                Revolutionizing resort booking and access management worldwide.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Visitors</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/resorts" className="hover:text-white transition-colors">Browse Resorts</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/subscriptions" className="hover:text-white transition-colors">Subscription Plans</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Owners</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth" className="hover:text-white transition-colors">List Your Resort</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Owner Dashboard</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResortAccess. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
