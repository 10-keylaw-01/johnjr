export const USD_TO_KSH_RATE = 130;

export const toKsh = value => Math.round(Number(value || 0) * USD_TO_KSH_RATE);

export const formatKsh = value =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
