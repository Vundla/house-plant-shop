export type ProductCategory = 'Low Light' | 'Pet Friendly' | 'Air Purifying';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
};

export const products: Product[] = [
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    price: 42,
    description: 'Ultra-tolerant glossy greenery that thrives on neglect and low light.',
    image:
      'https://images.unsplash.com/photo-1616628182501-52babc8e92be?auto=format&fit=crop&w=600&q=80',
    category: 'Low Light',
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    price: 36,
    description: 'Architectural leaves that clean the air and look chic in any room.',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
    category: 'Air Purifying',
  },
  {
    id: 'pothos',
    name: 'Golden Pothos',
    price: 24,
    description: 'Trailing variegated vines perfect for shelves, mantles, and hanging planters.',
    image:
      'https://images.unsplash.com/photo-1611224909260-1e2aa5740bad?auto=format&fit=crop&w=600&q=80',
    category: 'Low Light',
  },
  {
    id: 'calathea',
    name: 'Calathea Orbifolia',
    price: 48,
    description: 'Striking round leaves with silver stripes that dance with the daylight.',
    image:
      'https://images.unsplash.com/photo-1626716493731-428757b6bf82?auto=format&fit=crop&w=600&q=80',
    category: 'Pet Friendly',
  },
  {
    id: 'money-tree',
    name: 'Braided Money Tree',
    price: 58,
    description: 'Symbol of prosperity with braided trunk and lush canopy, loves bright spaces.',
    image:
      'https://images.unsplash.com/photo-1587502536583-4b7d0548f8d6?auto=format&fit=crop&w=600&q=80',
    category: 'Air Purifying',
  },
  {
    id: 'friendship-plant',
    name: 'Friendship Plant',
    price: 28,
    description: 'Velvety leaves with copper veins; compact and safe for pets.',
    image:
      'https://images.unsplash.com/photo-1616627978939-03c7fd03b762?auto=format&fit=crop&w=600&q=80',
    category: 'Pet Friendly',
  },
];

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
