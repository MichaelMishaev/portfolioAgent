// Curated Unsplash images for portfolio templates
// Using Unsplash Source API for high-quality placeholder images

export const placeholderImages = {
  // Hero backgrounds
  heroBackgrounds: {
    tech: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop',
    creative: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop',
    modern: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',
    minimal: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1080&fit=crop',
    gradient: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&h=1080&fit=crop',
    workspace: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&h=1080&fit=crop',
    abstract: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop',
    city: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop',
  },

  // Project showcase images - AI-generated high-quality portfolio mockups
  projects: {
    web1: '/images/portfolio/portfolio-web-1.png',
    web2: '/images/portfolio/portfolio-web-2.png',
    web3: '/images/portfolio/portfolio-web-3.png',
    mobile1: '/images/portfolio/portfolio-mobile-1.png',
    mobile2: '/images/portfolio/portfolio-mobile-2.png',
    design1: '/images/portfolio/portfolio-design-1.png',
    design2: '/images/portfolio/portfolio-design-2.png',
    dashboard: '/images/dashboard-hero.png',
    ecommerce: '/images/portfolio/portfolio-ecommerce.png',
    branding: '/images/portfolio/portfolio-branding.png',
  },

  // Team/People photos
  people: {
    person1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    person2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    person3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    person4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    person5: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    person6: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  },

  // Company logos (grayscale for social proof)
  logos: {
    company1: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&sat=-100',
    company2: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=80&fit=crop&sat=-100',
    company3: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=80&fit=crop&sat=-100',
    company4: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=80&fit=crop&sat=-100',
  },

  // Abstract/decorative backgrounds
  patterns: {
    geometric: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=800&fit=crop',
    colorful: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=800&fit=crop',
    gradient1: 'https://images.unsplash.com/photo-1557672199-6bb69a3c4c2f?w=1200&h=800&fit=crop',
    gradient2: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop',
  },

  // 3D/Modern graphics
  graphics: {
    '3d1': 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop',
    '3d2': 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&h=600&fit=crop',
    '3d3': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
  },

  // Product/Luxury images
  products: {
    luxury1: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop', // Watch
    luxury2: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop', // Sunglasses
    luxury3: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&h=600&fit=crop', // Perfume
    audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop', // Headphones
    vacuum: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop', // Tech product
  },
};

// Helper function to get a random image from a category
export function getRandomImage(category: keyof typeof placeholderImages): string {
  const images = Object.values(placeholderImages[category]);
  return images[Math.floor(Math.random() * images.length)];
}

// Helper to get specific image
export function getImage(category: keyof typeof placeholderImages, key: string): string {
  return (placeholderImages[category] as any)[key] || '';
}
