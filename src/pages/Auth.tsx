
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { QrCode, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [userType, setUserType] = useState<'visitor' | 'owner'>('visitor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              ResortAccess
            </h1>
          </Link>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
            <Button
              variant={userType === 'visitor' ? 'default' : 'ghost'}
              onClick={() => setUserType('visitor')}
              className={userType === 'visitor' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              <User className="w-4 h-4 mr-2" />
              Visitor
            </Button>
            <Button
              variant={userType === 'owner' ? 'default' : 'ghost'}
              onClick={() => setUserType('owner')}
              className={userType === 'owner' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Resort Owner
            </Button>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {userType === 'visitor' ? 'Welcome Back' : 'Owner Portal'}
            </CardTitle>
            <CardDescription>
              {userType === 'visitor' 
                ? 'Sign in to access exclusive resorts and manage your bookings'
                : 'Manage your resort listings and access control'
              }
            </CardDescription>
            {userType === 'owner' && (
              <Badge className="mx-auto bg-amber-100 text-amber-800 hover:bg-amber-200">
                Business Account
              </Badge>
            )}
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Sign In
                </Button>
                <p className="text-center text-sm text-gray-600">
                  <Link to="#" className="text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </p>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                {userType === 'owner' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Business Name</label>
                      <Input placeholder="Your Resort Business" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Business License</label>
                      <Input type="file" accept=".pdf,.jpg,.png" />
                      <p className="text-xs text-gray-500">Upload your business license for verification</p>
                    </div>
                  </>
                )}
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button variant="outline" className="hover:bg-gray-50">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="hover:bg-gray-50">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
