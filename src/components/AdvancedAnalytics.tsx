
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, MessageSquare } from 'lucide-react';

const AdvancedAnalytics = () => {
  const revenueData = {
    total: 45230,
    growth: 12.5,
    byType: [
      { type: "Full Day", amount: 28500, percentage: 63 },
      { type: "Half Day", amount: 12800, percentage: 28 },
      { type: "Hourly", amount: 3930, percentage: 9 }
    ]
  };

  const visitorInsights = {
    totalVisitors: 1247,
    newVsReturning: { new: 65, returning: 35 },
    topAmenities: ["Pool", "Beach Access", "Restaurant", "Spa", "WiFi"],
    demographics: [
      { age: "18-25", percentage: 25 },
      { age: "26-35", percentage: 45 },
      { age: "36-50", percentage: 30 }
    ]
  };

  const reviewSentiment = {
    overall: 4.7,
    positive: ["beautiful views", "excellent service", "clean facilities"],
    negative: ["crowded", "limited parking", "slow wifi"],
    totalReviews: 156
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${revenueData.total.toLocaleString()}</span>
                    <Badge className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{revenueData.growth}%
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {revenueData.byType.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.type}</span>
                        <div className="text-right">
                          <span className="font-medium">${item.amount.toLocaleString()}</span>
                          <span className="text-sm text-gray-500 ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Revenue Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visitors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Visitor Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">{visitorInsights.totalVisitors}</p>
                  <p className="text-sm text-gray-600">Total visitors this month</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">New vs Returning</h4>
                  <div className="flex space-x-4">
                    <div>
                      <span className="text-lg font-bold">{visitorInsights.newVsReturning.new}%</span>
                      <p className="text-xs text-gray-600">New</p>
                    </div>
                    <div>
                      <span className="text-lg font-bold">{visitorInsights.newVsReturning.returning}%</span>
                      <p className="text-xs text-gray-600">Returning</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Popular Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {visitorInsights.topAmenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">{amenity}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {visitorInsights.demographics.map((demo, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{demo.age}</span>
                      <span className="font-medium">{demo.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <span className="text-3xl font-bold">78%</span>
                  <p className="text-sm text-gray-600 mt-1">Average this month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>10:00 - 14:00</span>
                    <Badge>Peak</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>14:00 - 18:00</span>
                    <Badge variant="secondary">High</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Stay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <span className="text-3xl font-bold">6.5</span>
                  <p className="text-sm text-gray-600 mt-1">Hours per visit</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Review Sentiment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">{reviewSentiment.overall}</span>
                  <span className="text-gray-500 ml-2">out of 5</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">{reviewSentiment.totalReviews} Reviews</p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Positive Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {reviewSentiment.positive.map((keyword, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800">{keyword}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Areas for Improvement</h4>
                  <div className="flex flex-wrap gap-1">
                    {reviewSentiment.negative.map((keyword, index) => (
                      <Badge key={index} className="bg-red-100 text-red-800">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
