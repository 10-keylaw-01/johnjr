// Orders are kept in the browser (localStorage) since there is no backend.
const KEY = 'orders';

export const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const saveOrder = order => {
  try {
    localStorage.setItem(KEY, JSON.stringify([...getOrders(), order]));
  } catch {
    /* storage unavailable */
  }
};

export const findOrder = (orderId, contact) => {
  const id = orderId.trim().toUpperCase();
  const c = contact.trim().toLowerCase();
  return getOrders().find(
    o =>
      o.orderNumber.toUpperCase() === id &&
      [o.email, o.phone].some(v => v && v.toLowerCase() === c),
  );
};
