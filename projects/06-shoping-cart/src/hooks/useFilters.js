import { useContext } from 'react';
import { FiltersContext } from '../context/filters';

export const useFilters = () => {
  const { filters, setFilters } = useContext(FiltersContext);

  const filterProducts = (products) =>
    products.filter(
      ({ price, category }) =>
        price >= filters.minPrice &&
        (filters.category === 'all' || category === filters.category)
    );

  return { filters, filterProducts, setFilters };
};
