/**
 * Mock images for ImageCarousel component testing
 * Used in development mode when real images are insufficient
 */

// Helper to encode string to base64 (works in both Node.js and browser)
const encodeToBase64 = (str: string): string => {
  // Node.js environment
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64');
  }
  // Browser environment
  if (typeof btoa !== 'undefined') {
    return btoa(unescape(encodeURIComponent(str)));
  }
  // Fallback (should not happen in supported environments)
  return '';
};

// Generate SVG placeholder with different numbers and colors
const generateMockSVG = (number: number): string => {
  // Different background colors for visual distinction
  const colors = ['#4a90e2', '#50c878', '#ff6b6b', '#ffa500'];
  const color = colors[(number - 1) % colors.length];
  
  // SVG with number and dimensions (English text to avoid encoding issues)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
      <rect width="300" height="200" fill="${color}"/>
      <text x="150" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#ffffff">
        Image ${number}
      </text>
      <text x="150" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#f0f0f0">
        300×200
      </text>
      <text x="150" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#e0e0e0">
        Mock for testing
      </text>
    </svg>
  `.trim().replace(/\s+/g, ' ');
  
  // Convert to base64 data URL
  const base64 = encodeToBase64(svg);
  return `data:image/svg+xml;base64,${base64}`;
};

// Generate 4 distinct mock images
export const MOCK_CAROUSEL_IMAGES = [
  generateMockSVG(1),
  generateMockSVG(2),
  generateMockSVG(3),
  generateMockSVG(4),
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