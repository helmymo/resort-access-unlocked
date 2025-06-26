"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ResortFilters from '@/components/ResortFilters'; // Assuming components are aliased to @/components

// Mock resort data type - replace with actual type if available
interface Resort {
  id: string;
  name: string;
  location: string;
  price: number;
  amenities: string[];
  // Add other relevant resort properties
}

// Mock API function - replace with actual API call
const fetchResortsAPI = async (filters: Record<string, any>): Promise<Resort[]> => {
  console.log("Fetching resorts with filters:", filters);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data - replace with actual API endpoint
  const mockResorts: Resort[] = [
    { id: '1', name: 'Paradise Cove Resort', location: 'Maui, Hawaii', price: 300, amenities: ['pool', 'beach', 'restaurant'] },
    { id: '2', name: 'Mountain View Lodge', location: 'Aspen, Colorado', price: 450, amenities: ['gym', 'spa'] },
    { id: '3', name: 'Ocean Breeze Villas', location: 'Maldives', price: 700, amenities: ['pool', 'beach', 'spa', 'restaurant'] },
    { id: '4', name: 'Desert Oasis Retreat', location: 'Palm Springs, California', price: 250, amenities: ['pool', 'gym'] },
    { id: '5', name: 'City Lights Hotel', location: 'New York, New York', price: 500, amenities: ['gym', 'restaurant'] },
    { id: '6', name: 'Tranquil Gardens Inn', location: 'Kyoto, Japan', price: 350, amenities: ['spa', 'restaurant'] },
  ];

  let filteredResorts = mockResorts;

  if (filters.searchTerm) {
    const searchTermLower = filters.searchTerm.toLowerCase();
    filteredResorts = filteredResorts.filter(
      resort =>
        resort.name.toLowerCase().includes(searchTermLower) ||
        resort.location.toLowerCase().includes(searchTermLower)
    );
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filteredResorts = filteredResorts.filter(resort =>
      filters.amenities.every((amenity: string) => resort.amenities.includes(amenity))
    );
  }

  if (filters.priceRange) {
    filteredResorts = filteredResorts.filter(
      resort => resort.price >= filters.priceRange[0] && resort.price <= filters.priceRange[1]
    );
  }

  return filteredResorts;
};


export default function ResortsPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({
    searchTerm: '',
    amenities: [],
    priceRange: [0, 1000],
  });
  const [loading, setLoading] = useState(true);

  const fetchResorts = useCallback(async (currentFilters: Record<string, any>) => {
    setLoading(true);
    try {
      // Construct query parameters
      const queryParams = new URLSearchParams();
      if (currentFilters.searchTerm) {
        queryParams.append('search', currentFilters.searchTerm);
      }
      if (currentFilters.amenities && currentFilters.amenities.length > 0) {
        queryParams.append('amenities', currentFilters.amenities.join(','));
      }
      if (currentFilters.priceRange) {
        queryParams.append('minPrice', currentFilters.priceRange[0].toString());
        queryParams.append('maxPrice', currentFilters.priceRange[1].toString());
      }

      // Update URL without navigating (for bookmarking/sharing)
      // Note: This requires careful handling on server for initial load if using query params for SSR/SSG
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.pushState({ path: newUrl }, '', newUrl);

      // For now, we use the client-side mock filtering.
      // Replace with: const data = await fetchResortsAPI(currentFilters);
      // Or actual fetch:
      // const response = await fetch(`/api/resorts?${queryParams.toString()}`);
      // if (!response.ok) throw new Error('Failed to fetch resorts');
      // const data = await response.json();
      const data = await fetchResortsAPI(currentFilters);
      setResorts(data);
    } catch (error) {
      console.error("Failed to fetch resorts:", error);
      // Handle error state, e.g., show a toast message
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // On initial load, read filters from URL query parameters if present
    const queryParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = queryParams.get('search') || '';
    const initialAmenities = queryParams.get('amenities')?.split(',') || [];
    const initialMinPrice = parseInt(queryParams.get('minPrice') || '0', 10);
    const initialMaxPrice = parseInt(queryParams.get('maxPrice') || '1000', 10);

    const initialFilters = {
        searchTerm: initialSearchTerm,
        amenities: initialAmenities,
        priceRange: [initialMinPrice, initialMaxPrice] as [number, number],
    };
    setFilters(initialFilters);
    fetchResorts(initialFilters);
  }, [fetchResorts]);


  const handleFilterChange = useCallback((newFilters: Record<string, any>) => {
    setFilters(newFilters);
    fetchResorts(newFilters);
  }, [fetchResorts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Your Perfect Resort</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ResortFilters onFiltersChange={handleFilterChange} initialFilters={filters} />
        </div>

        <div className="md:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow-lg bg-card animate-pulse">
                        <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
                        <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                    </div>
                ))}
            </div>
          ) : resorts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resorts.map(resort => (
                <div key={resort.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow bg-card">
                  <div className="w-full h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
                    {/* Placeholder for an image - replace with actual image if available */}
                    <span className="text-muted-foreground">Resort Image</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-1 text-card-foreground">{resort.name}</h2>
                  <p className="text-sm text-muted-foreground mb-1">{resort.location}</p>
                  <p className="text-lg font-bold text-primary mb-2">${resort.price}/night</p>
                  {resort.amenities.length > 0 && (
                    <div className="text-xs">
                      <span className="font-medium">Amenities: </span>
                      {resort.amenities.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-muted-foreground">No resorts found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
