
import { Button } from "@/components/ui/button";
import { Waves, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Waves className="h-24 w-24 text-blue-600 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for seems to have drifted away like a wave on the shore. 
            Let's get you back to exploring amazing resorts.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full flex items-center justify-center">
              <Home className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
          <Link to="/#resorts">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Search className="h-4 w-4 mr-2" />
              Browse Resorts
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? <a href="#" className="text-blue-600 hover:underline">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
