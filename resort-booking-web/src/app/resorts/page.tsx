"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ResortFilters from '@/components/ResortFilters'; // Assuming components are aliased to @/components

interface Resort {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  location: string;
}

export default function ResortsPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({
    searchTerm: '',
    amenities: [], // Note: Amenities filtering is not implemented in the new API yet
    priceRange: [0, 1000], // Note: Price range filtering is not implemented in the new API yet
  });
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false); // For infinite scroll loading state
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchResorts = useCallback(async (currentPage: number, currentFilters: Record<string, any>, append: boolean = false) => {
    if (!append) setLoading(true); // Full page load
    else setIsFetchingMore(true); // Infinite scroll load

    try {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10', // Default limit
      });

      // TODO: Add filter parameters to queryParams when API supports them
      // if (currentFilters.searchTerm) {
      //   queryParams.append('search', currentFilters.searchTerm);
      // }
      // if (currentFilters.amenities && currentFilters.amenities.length > 0) {
      //  queryParams.append('amenities', currentFilters.amenities.join(','));
      // }
      // if (currentFilters.priceRange) {
      //   queryParams.append('minPrice', currentFilters.priceRange[0].toString());
      //   queryParams.append('maxPrice', currentFilters.priceRange[1].toString());
      // }

      const response = await fetch(`/api/resorts?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch resorts');
      const data = await response.json();

      setResorts(prevResorts => currentPage === 1 ? data.resorts : [...prevResorts, ...data.resorts]);
      setHasNextPage(data.hasNextPage);
      setPage(currentPage);

      // Update URL with filters (excluding page for simplicity in this phase)
      const filterQueryParams = new URLSearchParams();
        if (currentFilters.searchTerm) filterQueryParams.append('search', currentFilters.searchTerm);
        // Add other filters when implemented
      const newUrl = `${window.location.pathname}?${filterQueryParams.toString()}`;
      if (window.location.search !== `?${filterQueryParams.toString()}`) {
        window.history.pushState({ path: newUrl }, '', newUrl);
      }

    } catch (error) {
      console.error("Failed to fetch resorts:", error);
      // Handle error state, e.g., show a toast message
    } finally {
      if (!append) setLoading(false);
      else setIsFetchingMore(false);
    }
  }, []);

  useEffect(() => {
    // On initial load, read filters from URL query parameters if present
    const queryParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = queryParams.get('search') || '';

    const initialFilters = {
        searchTerm: initialSearchTerm,
        amenities: [],
        priceRange: [0, 1000],
    };
    setFilters(initialFilters);
    fetchResorts(1, initialFilters, false); // Fetch first page on initial load
  }, [fetchResorts]);

  const handleFilterChange = useCallback((newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setPage(1);
    setResorts([]); // Clear existing resorts
    fetchResorts(1, newFilters, false);
  }, [fetchResorts]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled to near bottom, not loading, and has more pages
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 &&
        !loading &&
        !isFetchingMore &&
        hasNextPage
      ) {
        fetchResorts(page + 1, filters, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, isFetchingMore, hasNextPage, page, filters, fetchResorts]);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Your Perfect Resort</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ResortFilters onFiltersChange={handleFilterChange} initialFilters={filters} />
        </div>

        <div className="md:col-span-3">
          {loading && resorts.length === 0 ? ( // Show main skeleton only on initial full load
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={`skeleton-${index}`} className="border rounded-lg p-4 shadow-lg bg-card animate-pulse">
                        <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
                        <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                    </div>
                ))}
            </div>
          ) : resorts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resorts.map(resort => (
                  <div key={resort.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow bg-card">
                    <img src={resort.image} alt={resort.name} className="w-full h-48 object-cover bg-muted rounded-md mb-4"/>
                    <h2 className="text-xl font-semibold mb-1 text-card-foreground">{resort.name}</h2>
                    <p className="text-sm text-muted-foreground mb-1">{resort.location}</p>
                    <p className="text-lg font-bold text-primary mb-2">${resort.price}/night</p>
                    {/* Amenities display removed as it's not in the new API data for now */}
                    {/* {resort.amenities.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium">Amenities: </span>
                        {resort.amenities.join(', ')}
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
              {isFetchingMore && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {Array.from({ length: 3 }).map((_, index) => ( // Skeleton for loading more items
                        <div key={`loading-more-skeleton-${index}`} className="border rounded-lg p-4 shadow-lg bg-card animate-pulse">
                            <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
                            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
              )}
              {!hasNextPage && resorts.length > 0 && (
                <p className="text-center text-muted-foreground mt-8">You've reached the end of the list.</p>
              )}
            </>
          ) : (
            !loading && ( // Only show "No resorts found" if not initial loading and no resorts
                <div className="text-center py-10">
                    <p className="text-xl text-muted-foreground">No resorts found matching your criteria.</p>
                </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
