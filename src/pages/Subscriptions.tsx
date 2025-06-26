import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Loader2 } from 'lucide-react'; // Added Loader2

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  monthlyPriceId?: string; // Placeholder for actual Stripe Price ID
  annualPriceId?: string;  // Placeholder for actual Stripe Price ID
}

const plansData: SubscriptionPlan[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Ideal for individuals and small projects.',
    price: '$9.99/month',
    features: [
      'Up to 10 projects',
      'Basic analytics',
      'Email support',
      '5GB storage',
    ],
    monthlyPriceId: 'price_beginner_monthly', // Example placeholder
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Perfect for growing businesses and teams.',
    price: '$19.99/month',
    features: [
      'Up to 50 projects',
      'Advanced analytics',
      'Priority email support',
      '25GB storage',
      'Team collaboration (up to 5 users)',
    ],
    monthlyPriceId: 'price_intermediate_monthly', // Example placeholder
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For large organizations and power users.',
    price: '$49.99/month',
    features: [
      'Unlimited projects',
      'Comprehensive analytics & reporting',
      'Dedicated phone & email support',
      '100GB storage',
      'Team collaboration (unlimited users)',
      'API access',
    ],
    monthlyPriceId: 'price_premium_monthly', // Example placeholder
  },
];

const Subscriptions = () => {
  const navigate = useNavigate();
  const [currentUserPlanId, setCurrentUserPlanId] = useState<string | null>('intermediate');
  const [isLoading, setIsLoading] = useState<string | null>(null); // Store ID of plan being processed
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/auth?message=Please log in to view subscriptions.');
    }
    // In a real application, fetch user's current subscription status from backend here.
    // e.g., apiClient.get('/user/subscription').then(res => setCurrentUserPlanId(res.data.planId));
  }, [navigate]);

  const handlePlanSelect = (planId: string, planName: string) => {
    if (planId === currentUserPlanId || isLoading) {
      return; // Do nothing if it's the current plan or already processing
    }

    setIsLoading(planId);
    setFeedbackMessage(null); // Clear previous messages
    console.log(`Initiating selection for ${planName} (ID: ${planId})...`);
    // Simulate API call and payment gateway interaction
    // In a real scenario, you'd call your backend here, which would then interact with Stripe/Paypal.
    // e.g., apiClient.post('/subscribe', { priceId: plan.monthlyPriceId })
    // .then(response => { /* handle Stripe session or redirect */ })

    setTimeout(() => {
      // Simulate a successful subscription change
      setCurrentUserPlanId(planId);
      setFeedbackMessage(`Successfully subscribed to ${planName}!`);
      console.log(`Successfully subscribed to ${planName}!`);
      setIsLoading(null);

      // Clear feedback message after a few seconds
      setTimeout(() => setFeedbackMessage(null), 5000);
    }, 2000); // Simulate 2 seconds delay
  };

  // Helper to determine button text and state
  const getButtonProps = (plan: SubscriptionPlan) => {
    if (plan.id === currentUserPlanId) {
      return { text: "Current Plan", disabled: true, variant: "outline" as const, showSpinner: false };
    }
    if (isLoading === plan.id) {
      return { text: "Processing...", disabled: true, variant: "secondary" as const, showSpinner: true };
    }
    // This logic for determining upgrade/downgrade based on array index is simplistic.
    // A more robust solution might involve explicit 'tierLevel' properties on plans.
    let actionText = `Choose ${plan.name}`;
    if (currentUserPlanId) {
      const currentUserPlanIndex = plansData.findIndex(p => p.id === currentUserPlanId);
      const targetPlanIndex = plansData.findIndex(p => p.id === plan.id);
      if (targetPlanIndex > currentUserPlanIndex) {
        actionText = `Upgrade to ${plan.name}`;
      } else if (targetPlanIndex < currentUserPlanIndex) {
        actionText = `Downgrade to ${plan.name}`;
      }
    }

    return { text: actionText, disabled: !!isLoading, variant: "default" as const, showSpinner: false };
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Our Subscription Plans
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Choose the perfect plan that fits your needs and scale with us.
        </p>
      </header>

      {feedbackMessage && (
        <div className="mb-8 p-4 text-center text-green-700 bg-green-100 border border-green-300 rounded-md">
          {feedbackMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {plansData.map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${currentUserPlanId === plan.id ? 'border-2 border-blue-600 shadow-lg' : 'border'}`}>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                {plan.id !== 'custom' && <span className="text-sm font-normal text-gray-500">/month</span>}
              </p>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-lg py-3"
                onClick={() => handlePlanSelect(plan.id, plan.name)}
                disabled={getButtonProps(plan).disabled}
                variant={getButtonProps(plan).variant}
              >
                {getButtonProps(plan).showSpinner && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {getButtonProps(plan).text}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
