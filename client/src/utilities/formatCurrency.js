const currencyFormater = new Intl.NumberFormat(undefined, {
  currency: 'PLN',
  style: 'currency',
});
export const formatCurrency = (price) => {
  return currencyFormater.format(price);
};
