'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming this is the correct path
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Assuming this is the correct path

// Define a type for the resort data
interface Resort {
  id: string;
  name: string;
  images: string[];
  description: string;
  amenities: string[];
  reviews: Array<{ user: string; comment: string; rating: number }>;
}

export default function ResortDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [resort, setResort] = useState<Resort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchResort = async () => {
        setLoading(true);
        setError(null);
        try {
          // Simulate API call - replace with actual fetch
          // const response = await fetch(`/api/resorts/${id}`);
          // if (!response.ok) {
          //   throw new Error('Failed to fetch resort data');
          // }
          // const data = await response.json();
          // setResort(data);

          // Mock data for development
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
          const mockData: Resort = {
            id: id,
            name: `Spectacular Views Resort ${id}`,
            images: [
              'https://via.placeholder.com/1200x600?text=Scenic+View+1',
              'https://via.placeholder.com/1200x600?text=Luxury+Suite',
              'https://via.placeholder.com/1200x600?text=Poolside+Relaxation',
              'https://via.placeholder.com/1200x600?text=Gourmet+Dining',
            ],
            description: `
              <p>Welcome to <strong>Spectacular Views Resort ${id}</strong>, where luxury meets tranquility. Nestled in a pristine natural setting, our resort offers breathtaking panoramic views and unparalleled comfort.</p>
              <p>Our rooms are designed with elegance and equipped with modern amenities to ensure a memorable stay. Whether you're here for a romantic getaway, a family vacation, or a solo retreat, we have something for everyone.</p>
              <h3 class="text-xl font-semibold mt-4 mb-2">Key Features:</h3>
              <ul>
                <li>Infinity pool overlooking the mountains</li>
                <li>World-class spa and wellness center</li>
                <li>Multiple fine dining restaurants</li>
                <li>Adventure activities and guided tours</li>
              </ul>
              <p class="mt-4"><em>Experience the extraordinary. Book your stay with us today!</em></p>
            `,
            amenities: ['Infinity Pool', 'Spa & Wellness', 'Gourmet Restaurants', 'Fitness Center', 'Free High-Speed WiFi', 'Concierge Service', 'Room Service', 'Business Center', 'Kids Club'],
            reviews: [
              { user: 'Alex P.', comment: 'Absolutely stunning! The views were incredible and the service was top-notch. Highly recommend!', rating: 5 },
              { user: 'Maria G.', comment: 'A wonderful escape from the city. The spa was fantastic, and the food was delicious. We will be back.', rating: 5 },
              { user: 'John D.', comment: 'Great resort, beautiful location. Some minor issues with room service speed, but overall a very good experience.', rating: 4 },
            ],
          };
          setResort(mockData);

        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchResort();
    } else {
      // Handle case where id is not available, though Next.js routing should prevent this for [id]
      setLoading(false);
      setError("Resort ID is missing.");
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <Skeleton className="h-10 w-3/4 mb-6 rounded" /> {/* Name */}
        <Skeleton className="w-full h-64 md:h-96 mb-8 rounded-lg" /> {/* Image Carousel */}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <Skeleton className="h-8 w-1/3 mb-3 rounded" /> {/* Description Title */}
              <Skeleton className="h-6 w-full mb-2 rounded" />
              <Skeleton className="h-6 w-full mb-2 rounded" />
              <Skeleton className="h-6 w-5/6 mb-2 rounded" />
            </div>
            <div>
              <Skeleton className="h-8 w-1/3 mb-3 rounded" /> {/* Amenities Title */}
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-full rounded" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/2 mb-3 rounded" /> {/* Reviews Title */}
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <Skeleton className="h-5 w-1/3 mb-2 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 mt-1 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600 dark:text-red-400 text-xl">Error loading resort: {error}</div>;
  }

  if (!resort) {
    return <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400 text-xl">Resort not found.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            {resort.name}
          </h1>
          {/* Placeholder for breadcrumbs or location info if available */}
          {/* <p className="text-lg text-gray-600 dark:text-gray-400">A luxurious stay awaits you.</p> */}
        </header>

        {/* Image Carousel */}
        <section className="mb-10">
          {resort.images && resort.images.length > 0 ? (
            <Carousel
              opts={{ loop: true }}
              className="w-full max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
            >
              <CarouselContent>
                {resort.images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={src}
                        alt={`${resort.name} gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-md transition-opacity opacity-70 hover:opacity-100" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-md transition-opacity opacity-70 hover:opacity-100" />
            </Carousel>
          ) : (
            <div className="w-full max-w-4xl mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center h-64 md:h-96">
              <p className="text-gray-500 dark:text-gray-400">No images available for this resort.</p>
            </div>
          )}
        </section>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
          {/* Main content: Description and Amenities */}
          <main className="md:col-span-2 space-y-10">
            {/* Rich Text Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">About {resort.name}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: resort.description }}
                className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300"
                // Style links and other elements within prose if needed
                // e.g., prose-a:text-blue-600 dark:prose-a:text-blue-400
              />
            </section>

            {/* Amenities List */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">Amenities</h2>
              {resort.amenities && resort.amenities.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-300">
                  {resort.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      {/* Simple checkmark icon, replace with a proper SVG icon if available */}
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      {amenity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No specific amenities listed for this resort.</p>
              )}
            </section>
          </main>

          {/* Sidebar: Reviews */}
          <aside className="md:col-span-1 space-y-6">
            <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 border-b pb-2 border-gray-300 dark:border-gray-700">Guest Reviews</h2>
              {resort.reviews && resort.reviews.length > 0 ? (
                <div className="space-y-6">
                  {resort.reviews.map((review, index) => (
                    <article key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{review.user}</h3>
                        <span className="ml-auto text-sm font-medium text-yellow-500 dark:text-yellow-400">{review.rating}/5 ★</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">Be the first to review this resort!</p>
              )}
            </section>
            {/* Potentially add a "Book Now" or "Check Availability" CTA here */}
            {/*
            <section className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">Ready to book?</h3>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out">
                Check Availability
              </button>
            </section>
            */}
          </aside>
        </div>
      </div>
    </div>
  );
}
