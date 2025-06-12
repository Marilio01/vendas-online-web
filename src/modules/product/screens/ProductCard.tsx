import { ProductType } from "../../../shared/types/ProductType";
import { useCartReducer } from "../../../store/reducers/cartReducer/useCartReducer";
import CartInsert from "../../cart/screens/CartInsert";
import { useUpdateCart } from "../../cart/hooks/useUpdateCart";
import {
  StyledCard,
  ProductName,
  ProductPrice,
} from '../styles/clienteProduct.style';
import { convertNumberToMoney } from '../../../shared/functions/money';
import CartQuantityManager from "../../cart/screens/CartQuantityManager";


interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart } = useCartReducer();
  const cartItems = Array.isArray(cart) ? cart : [];
  
  const productInCart = cartItems.find((item) => item.product?.id === product.id);

  const { handleUpdateAmount } = useUpdateCart();

  return (
    <StyledCard
      key={product.id}
      hoverable={false}
      cover={
        <img
          alt={product.name}
          src={product.image || '/default-image.png'}
        />
      }
    >
      <ProductName>{product.name}</ProductName>
      <ProductPrice>{convertNumberToMoney(product.price)}</ProductPrice>

      {productInCart ? (
        <CartQuantityManager
          amount={productInCart.amount}
          onIncrease={() => handleUpdateAmount(productInCart, productInCart.amount + 1)}
          onDecrease={() => handleUpdateAmount(productInCart, productInCart.amount - 1)}
        />
      ) : (
        <CartInsert productId={product.id} />
      )}
    </StyledCard>
  );
};

export default ProductCard;