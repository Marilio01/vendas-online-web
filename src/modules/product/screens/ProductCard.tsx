import { ProductType } from "../../../shared/types/ProductType";
import CartInsert from "../../cart/screens/CartInsert";
import {
  StyledCard,
  ProductName,
  ProductPrice,
} from '../styles/clienteProduct.style';
import { convertNumberToMoney } from '../../../shared/functions/money';
import CartQuantityManager from "../../cart/screens/CartQuantityManager";
import { useCart } from "../../cart/hooks/useCart";


interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, updateProductAmount } = useCart();
  const cartItems = Array.isArray(cart) ? cart : [];
  
  const productInCart = cartItems.find((item) => item.product?.id === product.id);

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
          onIncrease={() => updateProductAmount(productInCart, productInCart.amount + 1)}
          onDecrease={() => updateProductAmount(productInCart, productInCart.amount - 1)}
        />
      ) : (
        <CartInsert productId={product.id} />
      )}
    </StyledCard>
  );
};

export default ProductCard;