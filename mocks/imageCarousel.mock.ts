/**
 * Mock images for ImageCarousel component testing
 * Used in development mode when real images are insufficient
 */

export const MOCK_CAROUSEL_IMAGES = [
  'https://picsum.photos/570/630?random=1',
  'https://picsum.photos/570/630?random=2',
  'https://picsum.photos/570/630?random=3',
  'https://picsum.photos/570/630?random=4',
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