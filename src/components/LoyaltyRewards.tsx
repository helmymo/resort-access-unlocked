
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Gift, Crown, Trophy } from 'lucide-react';

const LoyaltyRewards = () => {
  const userTier = "Gold";
  const totalPoints = 2450;
  const nextTierPoints = 3000;

  const rewards = [
    { id: 1, title: "20% Off Next Booking", cost: 500, type: "discount" },
    { id: 2, title: "Free Resort Upgrade", cost: 1000, type: "upgrade" },
    { id: 3, title: "Exclusive Beach Access", cost: 750, type: "access" },
    { id: 4, title: "Complimentary Meal", cost: 300, type: "meal" }
  ];

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Bronze": return <Trophy className="h-5 w-5 text-amber-600" />;
      case "Silver": return <Star className="h-5 w-5 text-gray-500" />;
      case "Gold": return <Crown className="h-5 w-5 text-yellow-500" />;
      default: return <Gift className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Gift className="h-5 w-5 mr-2" />
          Loyalty & Rewards
        </CardTitle>
        <CardDescription>Your membership tier and available rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
          <div className="flex items-center space-x-3">
            {getTierIcon(userTier)}
            <div>
              <h3 className="font-semibold text-lg">{userTier} Member</h3>
              <p className="text-sm text-gray-600">{totalPoints} points available</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Next tier in</p>
            <p className="font-bold">{nextTierPoints - totalPoints} points</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Available Rewards</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rewards.map((reward) => (
              <div key={reward.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-sm">{reward.title}</h5>
                  <Badge variant="outline">{reward.cost} pts</Badge>
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  disabled={totalPoints < reward.cost}
                >
                  {totalPoints >= reward.cost ? "Redeem" : "Need more points"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyRewards;
