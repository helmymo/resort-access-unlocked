
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Users, Wifi, Car, Coffee, Waves, TrendingUp, Crown, Award, ChevronRight, Play, Shield, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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
      badge: "Editor's Pick",
      discount: "20% OFF"
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
      badge: "Trending",
      discount: null
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
      badge: "New Arrival",
      discount: "15% OFF"
    }
  ];

  const popularDestinations = [
    { name: "Miami Beach", resorts: 24, image: "/placeholder.svg", trending: true },
    { name: "Malibu", resorts: 18, image: "/placeholder.svg", trending: false },
    { name: "Key West", resorts: 15, image: "/placeholder.svg", trending: true },
    { name: "Aspen", resorts: 12, image: "/placeholder.svg", trending: false }
  ];

  const subscriptionPlans = [
    {
      name: "Beginner",
      price: 9.99,
      originalPrice: 19.99,
      features: ["5 bookings/month", "Basic support", "Mobile access", "Email notifications"],
      popular: false,
      savings: "Save 50%"
    },
    {
      name: "Intermediate",
      price: 19.99,
      originalPrice: 39.99,
      features: ["15 bookings/month", "Priority support", "Advanced filters", "Price alerts", "Concierge service"],
      popular: true,
      savings: "Save 50%"
    },
    {
      name: "Premium",
      price: 29.99,
      originalPrice: 59.99,
      features: ["Unlimited bookings", "24/7 Concierge", "Exclusive deals", "Early access", "VIP status", "Personal assistant"],
      popular: false,
      savings: "Save 50%"
    }
  ];

  const quickFilters = [
    { label: "Near Beach", icon: Waves, count: 45 },
    { label: "Family Friendly", icon: Users, count: 38 },
    { label: "With Pool", icon: Waves, count: 52 },
    { label: "Free WiFi", icon: Wifi, count: 67 },
    { label: "Free Parking", icon: Car, count: 41 },
    { label: "Restaurant", icon: Coffee, count: 29 }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      review: "Amazing experience! The booking process was seamless and the resort exceeded expectations. The loyalty program is fantastic!",
      rating: 5,
      resort: "Ocean Breeze Resort",
      verified: true
    },
    {
      name: "Mike Chen",
      avatar: "/placeholder.svg", 
      review: "Perfect family vacation destination. Kids loved the activities and we enjoyed the relaxation. Will definitely book again!",
      rating: 5,
      resort: "Mountain View Paradise",
      verified: true
    },
    {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg",
      review: "The personalized recommendations were spot-on. Found our dream resort through the app's smart suggestions!",
      rating: 5,
      resort: "Sunset Beach Resort",
      verified: true
    }
  ];

  const stats = [
    { number: "1,000+", label: "Premium Resorts" },
    { number: "50,000+", label: "Happy Travelers" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "24/7", label: "Support Available" }
  ];

  const handleSearch = () => {
    // In a real app, this would trigger search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-blue-600 animate-pulse" />
              <span className="text-2xl font-bold text-gray-900">ResortBook</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#resorts" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 transform">Browse Resorts</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 transform">How it Works</a>
              <a href="#plans" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 transform">Plans</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 transform">Reviews</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="hover:scale-105 transform transition-all">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="hover:scale-105 transform transition-all bg-gradient-to-r from-blue-600 to-purple-600">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Discover Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse"> Resort Experience</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Book exclusive access to premium resorts worldwide. From beachfront paradise to mountain retreats - your perfect getaway awaits with personalized recommendations and unbeatable deals.
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search resorts, locations, or amenities..." 
                    className="pl-10 h-12 text-lg border-0 focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" className="h-12 px-8 hover:scale-105 transform transition-all" onClick={handleSearch}>
                  Search Resorts
                </Button>
              </div>
              
              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                {quickFilters.map((filter, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center hover:scale-105 transform transition-all hover:bg-blue-50"
                  >
                    <filter.icon className="h-4 w-4 mr-2" />
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
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
            {featuredResorts.map((resort, index) => (
              <Card key={resort.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 transform group">
                <div className="relative">
                  <img src={resort.image} alt={resort.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                  {resort.discount && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                      {resort.discount}
                    </Badge>
                  )}
                  <Badge className="absolute top-4 left-4" variant={
                    resort.badge === "Editor's Pick" ? "default" : 
                    resort.badge === "Trending" ? "secondary" : "outline"
                  }>
                    {resort.badge === "Editor's Pick" && <Award className="h-3 w-3 mr-1" />}
                    {resort.badge === "Trending" && <TrendingUp className="h-3 w-3 mr-1" />}
                    {resort.badge === "New Arrival" && <Crown className="h-3 w-3 mr-1" />}
                    {resort.badge}
                  </Badge>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
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
                    {resort.amenities.map((amenity, amenityIndex) => (
                      <Badge key={amenityIndex} variant="outline" className="text-xs">{amenity}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/resort/${resort.id}`} className="flex-1">
                      <Button className="w-full hover:scale-105 transform transition-all">View Details</Button>
                    </Link>
                    <Button variant="outline" size="icon" className="hover:scale-105 transform transition-all">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
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
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 transform group">
                <div className="relative">
                  <img src={destination.image} alt={destination.name} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" />
                  {destination.trending && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-semibold">{destination.name}</h3>
                      <p className="text-sm opacity-90">{destination.resorts} resorts available</p>
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
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors group-hover:scale-110 transform duration-300">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Search & Discover</h3>
              <p className="text-gray-600">Browse through our curated collection of premium resorts using smart filters and personalized recommendations powered by AI.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors group-hover:scale-110 transform duration-300">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Book & Confirm</h3>
              <p className="text-gray-600">Select your dates, choose your package, and get instant confirmation with flexible booking options and secure payment processing.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors group-hover:scale-110 transform duration-300">
                <Waves className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Relax & Enjoy</h3>
              <p className="text-gray-600">Access your resort with our digital QR codes, enjoy 24/7 concierge support, and earn loyalty rewards for future bookings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="plans" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600">Unlock exclusive benefits and premium access with limited-time offers</p>
            <Badge className="mt-2 bg-red-500 text-white animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              Limited Time: 50% OFF
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`relative hover:scale-105 transform transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105 shadow-xl' : 'hover:shadow-lg'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Most Popular
                  </Badge>
                )}
                {plan.savings && (
                  <Badge className="absolute -top-3 right-4 bg-red-500 text-white">
                    {plan.savings}
                  </Badge>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg text-gray-500 line-through">${plan.originalPrice}</span>
                      <span className="text-4xl font-bold text-blue-600">${plan.price}</span>
                    </div>
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
                  <Button className={`w-full hover:scale-105 transform transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}`} variant={plan.popular ? "default" : "outline"}>
                    Get Started
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-gray-600">Real experiences from real travelers</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          {testimonial.verified && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>
                    <p className="text-sm text-gray-500">{testimonial.resort}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of travelers who trust ResortBook for their perfect getaway</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link to="/auth" className="flex-1">
              <Button size="lg" variant="secondary" className="w-full hover:scale-105 transform transition-all">
                Start Free Trial
              </Button>
            </Link>
            <Link to="#plans" className="flex-1">
              <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 transform transition-all">
                View Plans
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
                <Waves className="h-8 w-8" />
                <span className="text-2xl font-bold">ResortBook</span>
              </div>
              <p className="text-gray-400 mb-4">Connecting travelers with extraordinary resort experiences worldwide.</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover:scale-110 transform transition-all">
                  <span className="sr-only">Facebook</span>
                  📘
                </Button>
                <Button variant="ghost" size="icon" className="hover:scale-110 transform transition-all">
                  <span className="sr-only">Twitter</span>
                  🐦
                </Button>
                <Button variant="ghost" size="icon" className="hover:scale-110 transform transition-all">
                  <span className="sr-only">Instagram</span>
                  📷
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Travelers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Resorts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Subscription Plans</a></li>
                <li><Link to="/dashboard/user" className="hover:text-white transition-colors">My Dashboard</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Loyalty Program</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Resort Owners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">List Your Resort</a></li>
                <li><Link to="/dashboard/owner" className="hover:text-white transition-colors">Owner Dashboard</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Promotions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResortBook. All rights reserved. Made with ❤️ for travelers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
