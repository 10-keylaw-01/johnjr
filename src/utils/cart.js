import { toKsh } from './format';

export const getItemPrice = item => Number(item.dPrice ?? item.price ?? 0);

export const getCatalogItemPrice = item =>
  Number(item.dPrice ?? item.kshPrice ?? toKsh(item.price));

export const getItemImage = item => item.img || item.thumbnail || item.image || '';

export const getItemName = item => item.name || item.title || 'Product';

export const getCartSubtotal = cart =>
  cart.reduce(
    (total, item) => total + getItemPrice(item) * Number(item.quantity || 1),
    0,
  );
