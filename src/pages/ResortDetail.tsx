
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Star, MapPin, Wifi, Car, Coffee, Waves, Users, 
  Phone, Mail, Globe, Calendar, Clock, Shield, Heart
} from "lucide-react";
import { useState } from "react";

const ResortDetail = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock resort data - in real app this would come from API
  const resort = {
    id: 1,
    name: "Ocean Breeze Resort",
    location: "Miami Beach, FL",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    rating: 4.8,
    reviews: 234,
    price: 299,
    description: "Experience luxury at its finest with our oceanfront resort featuring pristine beaches, world-class amenities, and exceptional service. Perfect for romantic getaways, family vacations, or business retreats.",
    amenities: [
      { name: "Free WiFi", icon: Wifi },
      { name: "Beach Access", icon: Waves },
      { name: "Free Parking", icon: Car },
      { name: "Restaurant", icon: Coffee },
      { name: "Family Friendly", icon: Users },
    ],
    policies: [
      "Check-in: 3:00 PM",
      "Check-out: 11:00 AM",
      "Cancellation: Free cancellation up to 24 hours before arrival",
      "Pets: Not allowed",
      "Smoking: Non-smoking property"
    ],
    contact: {
      phone: "+1 (555) 123-4567",
      email: "info@oceanbreeze.com",
      website: "www.oceanbreeze.com"
    }
  };

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely amazing! The staff was incredibly friendly and the facilities were top-notch. Will definitely be coming back!"
    },
    {
      name: "Mike Chen",
      rating: 5,
      date: "1 month ago", 
      comment: "Perfect family vacation spot. The kids loved the pool area and we enjoyed the peaceful beach access."
    },
    {
      name: "Emily Davis",
      rating: 4,
      date: "2 months ago",
      comment: "Great location and beautiful resort. Only minor issue was the wifi could be stronger in some areas."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Search</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center"
              >
                <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Saved' : 'Save'}
              </Button>
              <Button>Book Now</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resort Images */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img src={resort.images[0]} alt={resort.name} className="w-full h-96 object-cover rounded-lg" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <img src={resort.images[1]} alt={resort.name} className="w-full h-44 md:h-44 object-cover rounded-lg" />
            <img src={resort.images[2]} alt={resort.name} className="w-full h-44 md:h-44 object-cover rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{resort.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{resort.location}</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{resort.rating}</span>
                  <span className="text-gray-500 ml-1">({resort.reviews} reviews)</span>
                </div>
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About this resort</h3>
                    <p className="text-gray-600 leading-relaxed">{resort.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {resort.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <amenity.icon className="h-5 w-5 text-blue-600" />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center mt-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="policies" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Resort Policies</h3>
                    <div className="space-y-3">
                      {resort.policies.map((policy, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{policy}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600">${resort.price}</div>
                  <div className="text-gray-500">per day</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input type="date" className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input type="date" className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>1 day</option>
                      <option>2 days</option>
                      <option>3 days</option>
                      <option>1 week</option>
                      <option>2 weeks</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full mb-4">Book Now</Button>
                <p className="text-xs text-gray-500 text-center">Free cancellation up to 24 hours before arrival</p>

                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-3">Contact Resort</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{resort.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{resort.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{resort.contact.website}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortDetail;
