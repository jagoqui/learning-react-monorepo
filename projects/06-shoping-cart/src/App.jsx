import { products as initialProducts } from '../mocks/products.json';
import { Products } from './components/products/Products';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { IS_DEVELOPMENT } from './config';
import { useFilters } from './hooks/useFilters';
import { CartProvider } from './context/cart';
import { Cart } from './components/cart/Cart';

function App() {
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
}

export default App;
