// Shared products data for search and other features
export const shopProducts = [
  {
    id: 1,
    name: 'NIVIS GEAR PRO',
    category: 'Expedition',
    price: 2999,
    image: 'https://images.pexels.com/photos/2886952/pexels-photo-2886952.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Professional expedition gear for extreme conditions.',
    source: 'shop'
  },
  {
    id: 2,
    name: 'NIVIS GEAR LITE',
    category: 'Urban',
    price: 1899,
    image: 'https://images.pexels.com/photos/2886947/pexels-photo-2886947.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Lightweight urban exploration equipment.',
    source: 'shop'
  },
  {
    id: 3,
    name: 'NIVIS GEAR X',
    category: 'Expedition',
    price: 3499,
    image: 'https://images.pexels.com/photos/2886949/pexels-photo-2886949.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Advanced expedition system with enhanced capabilities.',
    source: 'shop'
  },
  {
    id: 4,
    name: 'NIVIS GEAR MINI',
    category: 'Urban',
    price: 1299,
    image: 'https://images.pexels.com/photos/2886948/pexels-photo-2886948.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Compact urban exploration kit.',
    source: 'shop'
  },
  {
    id: 5,
    name: 'NIVIS GEAR ELITE',
    category: 'Expedition',
    price: 4999,
    image: 'https://images.pexels.com/photos/1813502/pexels-photo-1813502.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Elite expedition gear for professional explorers.',
    source: 'shop'
  },
  {
    id: 6,
    name: 'NIVIS GEAR STREET',
    category: 'Urban',
    price: 1599,
    image: 'https://images.pexels.com/photos/2719309/pexels-photo-2719309.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Street-ready exploration equipment.',
    source: 'shop'
  }
];

export const archiveProducts = [
  {
    id: 101,
    name: "First Gen Protego",
    category: 'Archive',
    price: 350,
    status: "sold_out",
    year: "2022",
    image: "https://picsum.photos/id/48/400/500",
    description: "The original Protego that started it all.",
    source: 'archive'
  },
  {
    id: 102,
    name: "Limited Edition Summit",
    category: 'Archive',
    price: 450,
    status: "sold_out",
    year: "2023",
    image: "https://picsum.photos/id/58/400/500",
    description: "Rare summit edition with premium materials.",
    source: 'archive'
  },
  {
    id: 103,
    name: "Glacier Pro Shell",
    category: 'Archive',
    price: 400,
    status: "limited",
    year: "2024",
    image: "https://picsum.photos/id/22/400/500",
    description: "Ultimate protection for glacial expeditions.",
    source: 'archive'
  }
];

export const allProducts = [...shopProducts, ...archiveProducts];

export function searchProducts(query) {
  if (!query || query.trim() === '') {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();

  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
}
