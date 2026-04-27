/**
 * Mock images for ImageCarousel component testing
 * Used in development mode when real images are insufficient
 */

// Same placeholder image as used in products.mock.ts
const PLACEHOLDER_IMAGE = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMzAwIDIwMCI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM0YTkwZTIiLz48dGV4dCB4PSIxNTAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmZmZmIj7QmNC30L7QsdGA0LDQttC10L3QuNC1INGC0L7QstCw0YDQsDwvdGV4dD48dGV4dCB4PSIxNTAiIHk9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZjBmMGYwIj4zMDDDlzIwMDwvdGV4dD48L3N2Zz4=`;

export const MOCK_CAROUSEL_IMAGES = [
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_IMAGE,
];

/**
 * Get mock images for testing
 * @param count - number of mock images to return (1-4)
 */
export const getMockImages = (count: number = 4): string[] => {
  if (count < 1) return [];
  if (count > 4) count = 4;
  return MOCK_CAROUSEL_IMAGES.slice(0, count);
};

/**
 * Enhance real images with mock images if needed for development
 * @param realImages - array of real image URLs
 * @param minCount - minimum number of images desired (default: 2)
 */
export const enhanceWithMockImages = (
  realImages: string[],
  minCount: number = 2
): string[] => {
  // In production, never use mock images
  if (process.env.NODE_ENV !== 'development') {
    return realImages;
  }

  // If we have enough real images, return them
  if (realImages.length >= minCount) {
    return realImages;
  }

  // Combine real images with mock images to reach minCount
  const combined = [...realImages];
  const mockNeeded = minCount - realImages.length;
  
  for (let i = 0; i < mockNeeded && i < MOCK_CAROUSEL_IMAGES.length; i++) {
    combined.push(MOCK_CAROUSEL_IMAGES[i]);
  }

  return combined;
};