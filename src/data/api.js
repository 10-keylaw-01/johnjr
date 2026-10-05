import { products, categories } from './products';

// Local replacements for the former dummyjson.com endpoints.
export const getCategories = () => categories;

export const getProducts = () => products;

export const searchProducts = query => {
  const q = query.trim().toLowerCase();
  return products.filter(
    p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
};

export const getProductById = id => products.find(p => p.id === Number(id));

export const getProductsByCategory = slug =>
  products.filter(p => p.category === slug);
