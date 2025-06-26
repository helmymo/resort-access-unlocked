
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Users, Calendar, Percent, Gift } from 'lucide-react';

const PromotionsManager = () => {
  const activePromotions = [
    {
      id: 1,
      title: "Summer Special",
      type: "percentage",
      value: 20,
      code: "SUMMER20",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      used: 45,
      limit: 100,
      status: "active"
    },
    {
      id: 2,
      title: "Weekend Warrior",
      type: "fixed",
      value: 50,
      code: "WEEKEND50",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      used: 23,
      limit: 200,
      status: "active"
    }
  ];

  const targetedOffers = [
    {
      id: 1,
      title: "New User Welcome",
      target: "New Users",
      discount: 15,
      active: true,
      conversions: 78
    },
    {
      id: 2,
      title: "Loyal Customer Bonus",
      target: "Gold Members",
      discount: 25,
      active: true,
      conversions: 34
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Promotions & Deals</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Promotion
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Deals</TabsTrigger>
          <TabsTrigger value="targeted">Targeted Offers</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-4">
            {activePromotions.map((promo) => (
              <Card key={promo.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg">{promo.title}</h3>
                        <Badge 
                          variant={promo.status === 'active' ? 'default' : 'secondary'}
                          className="flex items-center"
                        >
                          {promo.type === 'percentage' ? (
                            <Percent className="h-3 w-3 mr-1" />
                          ) : (
                            <Gift className="h-3 w-3 mr-1" />
                          )}
                          {promo.value}{promo.type === 'percentage' ? '%' : '$'} OFF
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Code</p>
                          <p className="font-mono font-bold">{promo.code}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="text-sm">{promo.startDate} to {promo.endDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Usage</p>
                          <p className="text-sm">{promo.used} / {promo.limit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Success Rate</p>
                          <p className="text-sm">{Math.round((promo.used / promo.limit) * 100)}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="targeted">
          <div className="space-y-4">
            {targetedOffers.map((offer) => (
              <Card key={offer.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{offer.title}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-sm text-gray-600">{offer.target}</span>
                        </div>
                        <Badge variant="outline">{offer.discount}% OFF</Badge>
                        <span className="text-sm text-gray-600">{offer.conversions} conversions</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={offer.active ? 'default' : 'secondary'}>
                        {offer.active ? 'Active' : 'Paused'}
                      </Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Savings Provided</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold">$12,450</span>
                <p className="text-sm text-gray-600 mt-1">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold">23.5%</span>
                <p className="text-sm text-gray-600 mt-1">Promo to booking</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Code</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-lg font-bold">SUMMER20</span>
                <p className="text-sm text-gray-600 mt-1">45 uses this month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionsManager;
