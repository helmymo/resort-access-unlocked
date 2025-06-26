"use client"; // Required for useEffect and useState

import { useEffect, useState } from 'react';

// Define an interface for the resort data
interface Resort {
  id: string;
  name: string;
  location: string;
  // Add other properties if needed, based on the mock API
}

const OwnerDashboardPage = () => {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        // TODO: Replace with actual authenticated API call
        const response = await fetch('/api/owner/resorts');
        if (!response.ok) {
          throw new Error('Failed to fetch resorts');
        }
        const data = await response.json();
        setResorts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Owner Dashboard</h1>
      {/* TODO: Add authentication logic here.
          This page should only be accessible to authenticated resort owners.
          If the user is not authenticated or not an owner, redirect them or show an error.
      */}

      <div className="mb-6">
        <button
          // onClick={() => { /* TODO: Implement Add New Resort functionality */ }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add New Resort
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading resorts...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && resorts.length === 0 && (
        <p className="text-gray-600">You do not own any resorts yet.</p>
      )}

      {!loading && !error && resorts.length > 0 && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Resort Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {resorts.map((resort) => (
                <tr key={resort.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {resort.name}
                  </th>
                  <td className="px-6 py-4">
                    {resort.location}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      // onClick={() => { /* TODO: Implement Edit functionality for resort ${resort.id} */ }}
                      className="font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-700 px-2 py-1 text-sm"
                      aria-label={`Edit ${resort.name}`}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboardPage;
