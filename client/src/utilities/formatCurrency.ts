const currencyFormater = new Intl.NumberFormat(undefined, {
  currency: 'PLN',
  style: 'currency',
});
export const formatCurrency = (price: number) => {
  return currencyFormater.format(price);
};
