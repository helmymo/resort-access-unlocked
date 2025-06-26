"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ResortFiltersProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  initialFilters?: Record<string, any>;
}

const AMENITIES_OPTIONS = [
  { id: 'pool', label: 'Pool' },
  { id: 'beach', label: 'Near Beach' },
  { id: 'gym', label: 'Gym' },
  { id: 'spa', label: 'Spa' },
  { id: 'restaurant', label: 'Restaurant' },
];

const ResortFilters: React.FC<ResortFiltersProps> = ({ onFiltersChange, initialFilters = {} }) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialFilters.amenities || []);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange || [0, 1000]);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      onFiltersChange({ searchTerm, amenities: selectedAmenities, priceRange });
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, selectedAmenities, priceRange, onFiltersChange]);


  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handlePriceChange = (newRange: number[]) => {
    // Ensure newRange is always [number, number]
    if (Array.isArray(newRange) && newRange.length === 2 && typeof newRange[0] === 'number' && typeof newRange[1] === 'number') {
      setPriceRange(newRange as [number, number]);
    } else if (Array.isArray(newRange) && newRange.length === 1 && typeof newRange[0] === 'number') {
      // Handle single value if slider returns that temporarily
      setPriceRange([newRange[0], priceRange[1]]);
    }
  };

  // Effect to trigger filter change immediately for amenities and price
  useEffect(() => {
    // We only want this effect to run for amenities and price, not search term (which has its own debounce)
    // So, we don't include searchTerm in the dependency array here.
    // However, we still want to pass the current searchTerm when these filters change.
    onFiltersChange({ searchTerm, amenities: selectedAmenities, priceRange });
  }, [selectedAmenities, priceRange, onFiltersChange, searchTerm]);


  return (
    <div className="space-y-6 p-4 border rounded-lg shadow-sm bg-card">
      <div>
        <Label htmlFor="search">Search by Name or Location</Label>
        <Input
          id="search"
          type="text"
          placeholder="e.g., Paradise Resort or Hawaii"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="text-lg font-semibold">Amenities</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {AMENITIES_OPTIONS.map(amenity => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.id}
                checked={selectedAmenities.includes(amenity.id)}
                onCheckedChange={() => handleAmenityChange(amenity.id)}
              />
              <Label htmlFor={amenity.id} className="font-normal">
                {amenity.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="priceRange" className="text-lg font-semibold">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          id="priceRange"
          min={0}
          max={1000}
          step={50}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          className="mt-2"
        />
         <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
    </div>
  );
};

export default ResortFilters;
