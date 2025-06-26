import { NextResponse } from 'next/server';

const resorts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Resort ${i + 1}`,
  description: `This is a description for Resort ${i + 1}.`,
  image: `https://picsum.photos/seed/${i + 1}/400/300`,
  price: Math.floor(Math.random() * 500) + 100,
  location: `Location ${String.fromCharCode(65 + (i % 26))}`,
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedResorts = resorts.slice(startIndex, endIndex);

  return NextResponse.json({
    resorts: paginatedResorts,
    hasNextPage: endIndex < resorts.length,
    totalPages: Math.ceil(resorts.length / limit),
  });
}
