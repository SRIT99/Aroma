import { APP_CONFIG } from './constants';

export const locationData = {
  city: 'Gauradaha',
  district: 'Jhapa',
  province: 'Province No. 1',
  country: 'Nepal',
  coordinates: APP_CONFIG.coordinates,
  address: APP_CONFIG.address,
  phone: APP_CONFIG.phone,
  email: APP_CONFIG.email,
  openingHours: APP_CONFIG.openingHours,
};

export const generateLocationKeywords = (baseKeywords: string[] = []): string[] => {
  const locationKeywords = [
    // City-based
    'restaurant in Gauradaha',
    'best restaurant Gauradaha',
    'Gauradaha restaurant',
    'food in Gauradaha',
    'dining in Gauradaha',
    'Gauradaha best food',
    'restaurant near Gauradaha',
    'Gauradaha food delivery',
    'best food in Gauradaha',
    'Gauradaha dining',
    
    // District-based
    'restaurant in Jhapa',
    'best restaurant Jhapa',
    'Jhapa restaurant',
    'food in Jhapa',
    'Jhapa best restaurant',
    'restaurant near Jhapa',
    'Jhapa food delivery',
    
    // Province-based
    'restaurant in Province No. 1',
    'Province No. 1 restaurant',
    'best restaurant Province No. 1',
    
    // Country-based
    'restaurant in Nepal',
    'best restaurant Nepal',
    'Nepali restaurant',
    'Nepal food delivery',
    
    // Location-specific
    'Gauradaha Main Road restaurant',
    'near Gauradaha Bus Park',
    'Gauradaha Bazar restaurant',
    'restaurant near Gauradaha Bazar',
    'Gauradaha market restaurant',
    
    // Cuisine-specific
    'Nepali food Gauradaha',
    'Indian food Jhapa',
    'Chinese restaurant Gauradaha',
    'best momo Gauradaha',
    'biryani in Gauradaha',
    'fried chicken Gauradaha',
    'authentic Nepali cuisine',
    'Indian restaurant Gauradaha',
    'Chinese food Jhapa',
    
    // Service-specific
    'food delivery Gauradaha',
    'takeaway restaurant Gauradaha',
    'dine in Gauradaha',
    'party hall Gauradaha',
    'restaurant with parking Gauradaha',
    'family restaurant Gauradaha',
    'fine dining Gauradaha',
    
    // Brand-specific
    'Aroma Restaurant Gauradaha',
    'Aroma Restaurant Jhapa',
    'Aroma Restaurant Nepal',
    
    // Combined
    'best restaurant in Gauradaha Jhapa',
    'best food in Gauradaha Jhapa',
    'restaurant near me Gauradaha',
  ];

  return [...new Set([...locationKeywords, ...baseKeywords])];
};

export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Aroma Restaurant',
    image: 'https://aromarestaurant.com/images/logo.png',
    description: 'Best restaurant in Gauradaha, Jhapa, Nepal serving authentic Nepali, Indian, and Chinese cuisine. Enjoy fine dining, takeaway, and delivery services.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gauradaha Main Road',
      addressLocality: 'Gauradaha',
      addressRegion: 'Jhapa',
      postalCode: '57205',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: locationData.coordinates.lat,
      longitude: locationData.coordinates.lng,
    },
    url: 'https://aromarestaurant.com',
    telephone: locationData.phone,
    email: locationData.email,
    openingHours: 'Mo-Su 10:00-22:00',
    priceRange: '$$',
    servesCuisine: ['Nepali', 'Indian', 'Chinese', 'Continental'],
    areaServed: {
      '@type': 'City',
      name: 'Gauradaha',
    },
    hasMenu: 'https://aromarestaurant.com/menu',
    paymentAccepted: ['Cash', 'Card', 'Online Payment'],
    parking: 'Available',
    smokingAllowed: false,
    hasDriveThroughService: false,
    acceptsReservations: true,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://facebook.com/aromarestaurant',
      'https://instagram.com/aromarestaurant',
      'https://twitter.com/aromarestaurant',
    ],
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://aromarestaurant.com${item.url}`,
    })),
  };
};

export const generateReviewSchema = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length,
    reviewCount: reviews.length,
    bestRating: '5',
    worstRating: '1',
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  };
};

export const generateMenuSchema = (menuItems: Array<{
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Aroma Restaurant Menu',
    description: 'Delicious menu items at Aroma Restaurant in Gauradaha, Jhapa',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Main Menu',
        hasMenuItem: menuItems.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          price: item.price,
          priceCurrency: 'NPR',
          image: item.image || 'https://aromarestaurant.com/images/default-menu.jpg',
          suitableForDiet: ['Non-Vegetarian', 'Vegetarian'],
        })),
      },
    ],
  };
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aroma Restaurant',
    description: 'Best restaurant in Gauradaha, Jhapa, Nepal',
    url: 'https://aromarestaurant.com',
    logo: 'https://aromarestaurant.com/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: locationData.phone,
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Nepali'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gauradaha Main Road',
      addressLocality: 'Gauradaha',
      addressRegion: 'Jhapa',
      postalCode: '57205',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: locationData.coordinates.lat,
      longitude: locationData.coordinates.lng,
    },
    sameAs: [
      'https://facebook.com/aromarestaurant',
      'https://instagram.com/aromarestaurant',
      'https://twitter.com/aromarestaurant',
    ],
  };
};

export const generateProductSchema = (products: Array<{
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Popular Dishes at Aroma Restaurant',
    description: 'Most popular dishes served at Aroma Restaurant in Gauradaha',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        category: product.category,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'NPR',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
};

export const generatePlaceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: 'Aroma Restaurant',
    description: 'Best restaurant in Gauradaha, Jhapa, Nepal',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gauradaha Main Road',
      addressLocality: 'Gauradaha',
      addressRegion: 'Jhapa',
      postalCode: '57205',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: locationData.coordinates.lat,
      longitude: locationData.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
    ],
  };
};

export const generateEventSchema = (events: Array<{
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventCollection',
    name: 'Events at Aroma Restaurant',
    description: 'Upcoming events and special occasions at Aroma Restaurant in Gauradaha',
    event: events.map((event) => ({
      '@type': 'Event',
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      image: event.image || 'https://aromarestaurant.com/images/event-default.jpg',
      location: {
        '@type': 'Place',
        name: 'Aroma Restaurant',
        address: event.location || 'Gauradaha Main Road, Gauradaha, Jhapa, Nepal',
      },
    })),
  };
};

export const generateWebPageSchema = (
  title: string,
  description: string,
  url: string,
  dateModified?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `https://aromarestaurant.com${url}`,
    dateModified: dateModified || new Date().toISOString(),
    about: {
      '@type': 'Thing',
      name: 'Aroma Restaurant',
    },
    primaryImageOfPage: 'https://aromarestaurant.com/images/og-image.jpg',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Aroma Restaurant',
      url: 'https://aromarestaurant.com',
    },
  };
};

export const generateMetaTags = (options: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}) => {
  const {
    title,
    description,
    keywords = [],
    image = '/images/og-image.jpg',
    url = '',
    type = 'website',
    publishedTime,
    modifiedTime,
    author = 'Aroma Restaurant',
    section = 'Restaurant',
    tags = [],
  } = options;

  const fullUrl = `https://aromarestaurant.com${url}`;
  const imageUrl = image.startsWith('http') ? image : `https://aromarestaurant.com${image}`;

  // Combine keywords with location keywords
  const allKeywords = generateLocationKeywords(keywords);

  return {
    title,
    description,
    keywords: allKeywords.join(', '),
    'og:title': title,
    'og:description': description,
    'og:image': imageUrl,
    'og:url': fullUrl,
    'og:type': type,
    'og:site_name': 'Aroma Restaurant',
    'og:locale': 'en_NP',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': imageUrl,
    'twitter:creator': '@aromarestaurant',
    'twitter:site': '@aromarestaurant',
    'article:published_time': publishedTime,
    'article:modified_time': modifiedTime || new Date().toISOString(),
    'article:author': author,
    'article:section': section,
    'article:tag': tags.join(', '),
    'geo.region': 'NP-P1',
    'geo.placename': 'Gauradaha',
    'geo.position': `${locationData.coordinates.lat};${locationData.coordinates.lng}`,
    'ICBM': `${locationData.coordinates.lat}, ${locationData.coordinates.lng}`,
    'robots': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    'canonical': fullUrl,
  };
};

export const generateJsonLd = (schema: Record<string, any>) => {
  return {
    __html: JSON.stringify(schema),
  };
};

export const generateAllSchemas = () => {
  return {
    organization: generateOrganizationSchema(),
    localBusiness: generateLocalBusinessSchema(),
    place: generatePlaceSchema(),
  };
};

export const seoUtils = {
  locationData,
  generateLocationKeywords,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  generateMenuSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateProductSchema,
  generatePlaceSchema,
  generateEventSchema,
  generateWebPageSchema,
  generateMetaTags,
  generateJsonLd,
  generateAllSchemas,
};

export default seoUtils;