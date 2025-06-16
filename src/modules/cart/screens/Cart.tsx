import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { cart } = useCartReducer();

  useCart(); 

  return (
    <div>
      <h2>Itens do Carrinho </h2>
      <ul>
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id}>
              {item.product.name} - Quantidade: {item.amount} - Preço: {item.product.price}
            </li>
          ))
        ) : (
          <li>Carrinho vazio</li>
        )}
      </ul>
    </div>
  );
};

export default Cart;