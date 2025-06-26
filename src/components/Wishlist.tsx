
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star, Bell, Plus } from 'lucide-react';

const Wishlist = () => {
  const collections = [
    {
      id: 1,
      name: "Family Vacations",
      resorts: [
        { id: 1, name: "Sunny Bay Resort", location: "Florida", rating: 4.8, priceAlert: true },
        { id: 2, name: "Adventure Cove", location: "California", rating: 4.7, priceAlert: false }
      ]
    },
    {
      id: 2,
      name: "Romantic Getaways",
      resorts: [
        { id: 3, name: "Sunset Paradise", location: "Hawaii", rating: 4.9, priceAlert: true }
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              My Wishlist
            </CardTitle>
            <CardDescription>Saved resorts and custom collections</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {collections.map((collection) => (
          <div key={collection.id} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">{collection.name}</h3>
            <div className="space-y-3">
              {collection.resorts.map((resort) => (
                <div key={resort.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{resort.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {resort.location}
                      <Star className="h-3 w-3 ml-3 mr-1 text-yellow-500" />
                      {resort.rating}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {resort.priceAlert && (
                      <Badge variant="secondary" className="text-xs">
                        <Bell className="h-3 w-3 mr-1" />
                        Price Alert
                      </Badge>
                    )}
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Wishlist;
