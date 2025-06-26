import { GET } from './route'; // Adjust the import path as needed
import { NextRequest } from 'next/server';
import { describe, it, expect, beforeEach } from '@jest/globals';

// Mock the NextRequest object
const mockRequest = (searchParams: Record<string, string>): NextRequest => {
  const url = `http://localhost/api/resorts?${new URLSearchParams(searchParams).toString()}`;
  return new NextRequest(url);
};

describe('API Route: /api/resorts', () => {
  describe('GET', () => {
    it('should return the first page of resorts with default limit', async () => {
      const req = mockRequest({});
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resorts.length).toBe(10);
      expect(data.resorts[0].id).toBe(1);
      expect(data.hasNextPage).toBe(true);
      expect(data.totalPages).toBe(10); // 100 items / 10 per page
    });

    it('should return the specified page of resorts', async () => {
      const req = mockRequest({ page: '2' });
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resorts.length).toBe(10);
      expect(data.resorts[0].id).toBe(11); // Assuming default limit of 10
      expect(data.hasNextPage).toBe(true);
    });

    it('should return the specified number of resorts with limit parameter', async () => {
      const req = mockRequest({ limit: '5' });
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resorts.length).toBe(5);
      expect(data.resorts[0].id).toBe(1);
      expect(data.hasNextPage).toBe(true);
      expect(data.totalPages).toBe(20); // 100 items / 5 per page
    });

    it('should correctly indicate no next page on the last page', async () => {
      const req = mockRequest({ page: '10', limit: '10' }); // 100 items, 10 per page, so page 10 is the last
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resorts.length).toBe(10);
      expect(data.resorts[9].id).toBe(100);
      expect(data.hasNextPage).toBe(false);
    });

    it('should return fewer items if on the last page and not a full page', async () => {
      const req = mockRequest({ page: '15', limit: '7' }); // 100 items / 7 per page = 14.28 -> 15 pages. Last page has 2 items.
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resorts.length).toBe(2); // 100 - (14 * 7) = 100 - 98 = 2
      expect(data.resorts[0].id).toBe(99);
      expect(data.hasNextPage).toBe(false);
      expect(data.totalPages).toBe(15);
    });

    it('should return an empty array and no next page if page is out of bounds', async () => {
      const req = mockRequest({ page: '100', limit: '10' }); // Page 100 is out of bounds
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resorts.length).toBe(0);
      expect(data.hasNextPage).toBe(false);
    });

    it('should handle non-numeric page and limit by using defaults', async () => {
      const req = mockRequest({ page: 'abc', limit: 'xyz' });
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resorts.length).toBe(10); // Default limit
      expect(data.resorts[0].id).toBe(1); // Default page (1)
      expect(data.hasNextPage).toBe(true);
    });
     it('should handle negative page and limit by using defaults (or coerced to positive)', async () => {
      // Current implementation of parseInt will make them NaN, then default kicks in.
      const req = mockRequest({ page: '-1', limit: '-5' });
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resorts.length).toBe(10); // Default limit
      expect(data.resorts[0].id).toBe(1); // Default page (1)
      expect(data.hasNextPage).toBe(true);
    });
  });
});
