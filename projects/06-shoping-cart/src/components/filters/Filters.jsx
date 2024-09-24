import { useId } from 'react';
import './Filters.css';
import { useFilters } from '../../hooks/useFilters';

export const Filters = () => {
  const { filters, setFilters } = useFilters();
  const minPriceFilteredId = useId();
  const categoryFilteredId = useId();

  const handleChangeMinPrice = (event) => {
    const { value } = event.target;
    setFilters((prevState) => ({
      ...prevState,
      minPrice: value,
    }));
  };

  const handleChangeCategory = (event) => {
    const { value } = event.target;
    setFilters((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilteredId}>Starting Price</label>
        <input
          type="range"
          name="price"
          id={minPriceFilteredId}
          min="0"
          max="1000"
          value={filters.minPrice}
          onChange={handleChangeMinPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilteredId}>Category</label>
        <select
          name="category"
          id={categoryFilteredId}
          onChange={handleChangeCategory}
        >
          <option value="groceries">Groceries</option>
          <option value="furniture">Furniture</option>
          <option value="beauty">Beauty</option>
          <option value="furniture">Furniture</option>
          <option value="all">All</option>
        </select>
      </div>
    </section>
  );
};
