import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import ResortsPage from './page'; // Adjust path as needed
import ResortFilters from '@/components/ResortFilters'; // Adjust path as needed

// Mock the ResortFilters component as its internals are not the focus of these tests
jest.mock('@/components/ResortFilters', () => {
  const OriginalResortFilters = jest.requireActual('@/components/ResortFilters') as any;
  return {
    __esModule: true,
    default: jest.fn(({ onFiltersChange, initialFilters }) => (
      <div data-testid="mock-resort-filters">
        <button onClick={() => onFiltersChange({ searchTerm: 'new search' })}>
          Simulate Filter Change
        </button>
      </div>
    )),
    // Preserve other exports if any, e.g. types, though not strictly needed for this mock
    ...Object.keys(OriginalResortFilters)
      .filter(key => key !== 'default')
      .reduce((obj, key) => {
        obj[key] = OriginalResortFilters[key];
        return obj;
      }, {} as any),
  };
});


// Helper to create mock resort data
const createMockResort = (id: number, page: number) => ({
  id,
  name: `Resort ${id} (Page ${page})`,
  description: `Description for resort ${id}`,
  image: `https://picsum.photos/seed/${id}/200/200`,
  price: 100 + (id % 5) * 50,
  location: `Location ${String.fromCharCode(65 + (id % 26))}`,
});

// Mock global fetch
global.fetch = jest.fn();

const mockFetch = (page = 1, limit = 10, hasNextPage = true, totalItems = 100, filters = {}) => {
  const startIndex = (page - 1) * limit;
  const items = Array.from({ length: Math.min(limit, totalItems - startIndex) }, (_, i) =>
    createMockResort(startIndex + i + 1, page)
  );

  // Simulate filtering if a searchTerm is provided in mock (API doesn't actually filter yet)
  let filteredItems = items;
  if ((filters as any).searchTerm) {
    filteredItems = items.filter(item => item.name.includes((filters as any).searchTerm));
  }


  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      resorts: filteredItems,
      hasNextPage: hasNextPage && (page * limit < totalItems),
      totalPages: Math.ceil(totalItems / limit),
    }),
  }) as Promise<Response>;
};


describe('ResortsPage Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    // Mock window.history.pushState
    window.history.pushState = jest.fn();
    // Mock IntersectionObserver for infinite scroll (if a library using it was involved)
    // For direct scroll event, this is not needed, but good practice for robustness
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;

    // Mock scroll related properties
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
    Object.defineProperty(document.documentElement, 'scrollTop', { writable: true, configurable: true, value: 0 });
    Object.defineProperty(document.documentElement, 'offsetHeight', { writable: true, configurable: true, value: 1000 });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading skeletons initially and then the first page of resorts', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => mockFetch(1, 3, true, 6)); // 2 pages total

    render(<ResortsPage />);

    // Check for initial loading skeletons (assuming 6 skeletons for initial load)
    // The component shows 6 skeletons before loading, then replaces with actual items.
    // If API returns less than 6, it will still show 6 skeletons initially if resorts.length is 0.
    expect(screen.getAllByRole('status', { name: /loading/i }).length).toBeGreaterThan(0); // Generic way if skeletons don't have specific roles

    // Wait for resorts to load
    await waitFor(() => {
      expect(screen.getByText('Resort 1 (Page 1)')).toBeInTheDocument();
      expect(screen.getByText('Resort 2 (Page 1)')).toBeInTheDocument();
      expect(screen.getByText('Resort 3 (Page 1)')).toBeInTheDocument();
    });

    expect(screen.queryByRole('status', { name: /loading/i })).toBeNull(); // Skeletons should be gone
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/resorts?page=1&limit=10');
  });

  it('loads more resorts on scroll', async () => {
    (fetch as jest.Mock)
      .mockImplementationOnce(() => mockFetch(1, 3, true, 6)) // Page 1
      .mockImplementationOnce(() => mockFetch(2, 3, false, 6)); // Page 2 (last page)

    render(<ResortsPage />);

    await waitFor(() => expect(screen.getByText('Resort 1 (Page 1)')).toBeInTheDocument());
    expect(screen.getByText('Resort 3 (Page 1)')).toBeInTheDocument();
    expect(screen.queryByText('Resort 4 (Page 2)')).not.toBeInTheDocument();

    // Simulate scrolling to the bottom
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 300 }); // innerHeight (800) + scrollTop (300) >= offsetHeight (1000) - 200
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByText('Resort 4 (Page 2)')).toBeInTheDocument();
      expect(screen.getByText('Resort 6 (Page 2)')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(2, '/api/resorts?page=2&limit=10');

    // Check for "end of list" message
    await waitFor(() => {
        expect(screen.getByText("You've reached the end of the list.")).toBeInTheDocument();
    });
  });

  it('does not load more resorts if there are no more pages', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => mockFetch(1, 3, false, 3)); // Only one page

    render(<ResortsPage />);

    await waitFor(() => expect(screen.getByText('Resort 1 (Page 1)')).toBeInTheDocument());

    // Simulate scrolling
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 300 });
    fireEvent.scroll(window);

    // Wait a bit to ensure no additional fetch is made
    await new Promise(r => setTimeout(r, 100));

    expect(fetch).toHaveBeenCalledTimes(1); // Should only be called once for the initial load
    await waitFor(() => {
        expect(screen.getByText("You've reached the end of the list.")).toBeInTheDocument();
    });
  });


  it('fetches new resorts when filters change', async () => {
    (fetch as jest.Mock)
      .mockImplementationOnce(() => mockFetch(1, 3, true, 6, { searchTerm: '' })) // Initial load
      .mockImplementationOnce(() => mockFetch(1, 3, true, 6, { searchTerm: 'new search' })); // Filtered load

    render(<ResortsPage />);

    await waitFor(() => expect(screen.getByText('Resort 1 (Page 1)')).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledWith('/api/resorts?page=1&limit=10'); // Initial call

    const filterButton = screen.getByText('Simulate Filter Change');
    fireEvent.click(filterButton);

    // Should show loading state for the main content area again
    // Since resorts array is cleared, the main loading skeleton should appear.
    await waitFor(() => {
        expect(screen.getAllByRole('status', { name: /loading/i }).length).toBeGreaterThan(0);
    });


    await waitFor(() => {
      // Assuming the mockFetch for 'new search' still returns items named "Resort X (Page Y)"
      // but the key is that a new fetch call for page 1 happens.
      // The actual filtering logic is in the API, which we are mocking.
      // The component should reset to page 1 and fetch.
      expect(screen.getByText('Resort 1 (Page 1)')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    // The actual URL won't have searchTerm because the component doesn't pass it to API yet
    // but it does trigger a fetch for page 1.
    // The important part is that fetch is called again for page 1.
    expect(fetch).toHaveBeenNthCalledWith(2, '/api/resorts?page=1&limit=10');
  });

   it('displays "No resorts found" message when API returns empty list initially', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => mockFetch(1, 10, false, 0)); // No resorts

    render(<ResortsPage />);

    await waitFor(() => {
      expect(screen.getByText('No resorts found matching your criteria.')).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('displays loading skeletons for "load more" correctly', async () => {
    (fetch as jest.Mock)
      .mockImplementationOnce(() => mockFetch(1, 3, true, 6)) // Page 1
      .mockImplementationOnce(async () => { // Page 2, delayed
        await new Promise(r => setTimeout(r, 100)); // Simulate network delay
        return mockFetch(2, 3, false, 6)();
      });

    render(<ResortsPage />);

    await waitFor(() => expect(screen.getByText('Resort 1 (Page 1)')).toBeInTheDocument());

    // Simulate scrolling to trigger load more
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 300 });
    fireEvent.scroll(window);

    // Check for "loading more" skeletons (these are appended, so initial resorts still visible)
    // The component shows 3 skeletons for "loading more"
    await waitFor(() => {
        const loadingMoreSkeletons = screen.getAllByRole('status', { name: /loading/i });
        expect(loadingMoreSkeletons.length).toBe(3); // Assuming 3 skeletons for loading more
        expect(screen.getByText('Resort 1 (Page 1)')).toBeInTheDocument(); // Old items still there
    });

    // Wait for new items to load
    await waitFor(() => {
      expect(screen.getByText('Resort 4 (Page 2)')).toBeInTheDocument();
    }, { timeout: 5000 }); // Increased timeout for potentially slower async ops

    // Skeletons for "loading more" should be gone
    expect(screen.queryByRole('status', { name: /loading/i })).toBeNull();
  });

});
