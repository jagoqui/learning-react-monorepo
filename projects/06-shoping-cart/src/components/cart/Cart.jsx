import './Cart.css';

import { useId } from 'react';
import { CartIcon, ClearCartIcon } from '../Icons.jsx';
import { useCart } from '../../hooks/useCart.js';

const CartItem = ({ thumbnail, price, title, quantity, addToCart }) => (
  <li>
    <img src={thumbnail} alt={title} />
    <div>
      <strong>{title}</strong> - ${price}
    </div>

    <footer>
      <small>Qty: {quantity}</small>
      <button onClick={addToCart}>+</button>
    </footer>
  </li>
);

export const Cart = () => {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button onClick={clearCart} style={{marginBottom: '48px'}}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
};
