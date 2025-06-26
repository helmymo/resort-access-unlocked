
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Users, Wifi, Car, Coffee, Waves, TrendingUp, Crown, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredResorts = [
    {
      id: 1,
      name: "Ocean Breeze Resort",
      location: "Miami Beach, FL",
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 234,
      price: 299,
      amenities: ["Pool", "Beach", "Spa"],
      badge: "Editor's Pick"
    },
    {
      id: 2,
      name: "Mountain View Paradise",
      location: "Aspen, CO",
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 189,
      price: 349,
      amenities: ["Spa", "Hiking", "Restaurant"],
      badge: "Trending"
    },
    {
      id: 3,
      name: "Sunset Beach Resort",
      location: "Malibu, CA",
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 156,
      price: 259,
      amenities: ["Beach", "Pool", "Yoga"],
      badge: "New Arrival"
    }
  ];

  const popularDestinations = [
    { name: "Miami Beach", resorts: 24, image: "/placeholder.svg" },
    { name: "Malibu", resorts: 18, image: "/placeholder.svg" },
    { name: "Key West", resorts: 15, image: "/placeholder.svg" },
    { name: "Aspen", resorts: 12, image: "/placeholder.svg" }
  ];

  const subscriptionPlans = [
    {
      name: "Beginner",
      price: 9.99,
      features: ["5 bookings/month", "Basic support", "Mobile access"],
      popular: false
    },
    {
      name: "Intermediate",
      price: 19.99,
      features: ["15 bookings/month", "Priority support", "Advanced filters", "Price alerts"],
      popular: true
    },
    {
      name: "Premium",
      price: 29.99,
      features: ["Unlimited bookings", "Concierge service", "Exclusive deals", "Early access"],
      popular: false
    }
  ];

  const quickFilters = [
    { label: "Near Beach", icon: Waves },
    { label: "Family Friendly", icon: Users },
    { label: "With Pool", icon: Waves },
    { label: "Free WiFi", icon: Wifi },
    { label: "Free Parking", icon: Car },
    { label: "Restaurant", icon: Coffee }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      review: "Amazing experience! The booking process was seamless and the resort exceeded expectations.",
      rating: 5,
      resort: "Ocean Breeze Resort"
    },
    {
      name: "Mike Chen",
      review: "Perfect family vacation destination. Kids loved the activities and we enjoyed the relaxation.",
      rating: 5,
      resort: "Mountain View Paradise"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ResortBook</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#resorts" className="text-gray-600 hover:text-blue-600 transition-colors">Browse Resorts</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#plans" className="text-gray-600 hover:text-blue-600 transition-colors">Plans</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Resort Experience</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Book exclusive access to premium resorts worldwide. From beachfront paradise to mountain retreats - your perfect getaway awaits.
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search resorts, locations, or amenities..." 
                    className="pl-10 h-12 text-lg border-0 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button size="lg" className="h-12 px-8">
                  Search Resorts
                </Button>
              </div>
              
              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                {quickFilters.map((filter, index) => (
                  <Button key={index} variant="outline" size="sm" className="flex items-center">
                    <filter.icon className="h-4 w-4 mr-2" />
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resorts */}
      <section id="resorts" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Resorts</h2>
            <p className="text-gray-600">Hand-picked destinations for an unforgettable experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredResorts.map((resort) => (
              <Card key={resort.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={resort.image} alt={resort.name} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 left-4" variant={
                    resort.badge === "Editor's Pick" ? "default" : 
                    resort.badge === "Trending" ? "secondary" : "outline"
                  }>
                    {resort.badge === "Editor's Pick" && <Award className="h-3 w-3 mr-1" />}
                    {resort.badge === "Trending" && <TrendingUp className="h-3 w-3 mr-1" />}
                    {resort.badge === "New Arrival" && <Crown className="h-3 w-3 mr-1" />}
                    {resort.badge}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{resort.name}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {resort.location}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{resort.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({resort.reviews} reviews)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">${resort.price}</span>
                      <span className="text-gray-500 text-sm">/day</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resort.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{amenity}</Badge>
                    ))}
                  </div>
                  <Link to={`/resort/${resort.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-gray-600">Explore the most sought-after locations</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={destination.image} alt={destination.name} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-semibold">{destination.name}</h3>
                      <p className="text-sm opacity-90">{destination.resorts} resorts</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple steps to your perfect getaway</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Search & Discover</h3>
              <p className="text-gray-600">Browse through our curated collection of premium resorts using smart filters and personalized recommendations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Book & Confirm</h3>
              <p className="text-gray-600">Select your dates, choose your package, and get instant confirmation with flexible booking options.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Relax & Enjoy</h3>
              <p className="text-gray-600">Access your resort with our digital QR codes and enjoy a seamless, premium experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="plans" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600">Unlock exclusive benefits and premium access</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-gray-600">Real experiences from real travelers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.resort}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Waves className="h-8 w-8" />
                <span className="text-2xl font-bold">ResortBook</span>
              </div>
              <p className="text-gray-400">Connecting travelers with extraordinary resort experiences worldwide.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Travelers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Resorts</a></li>
                <li><a href="#" className="hover:text-white">Subscription Plans</a></li>
                <li><Link to="/dashboard/user" className="hover:text-white">My Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Resort Owners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">List Your Resort</a></li>
                <li><Link to="/dashboard/owner" className="hover:text-white">Owner Dashboard</Link></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResortBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
