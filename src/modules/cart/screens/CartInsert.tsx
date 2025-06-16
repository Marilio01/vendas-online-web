import { useCart } from "../hooks/useCart";
import { StyledButton } from "../styles/CartInsert.styles";
import { ShoppingCartOutlined } from "@ant-design/icons";

type CartInsertProps = {
  productId: number;
};

const CartInsert = ({ productId }: CartInsertProps) => {
  const { insertProductInCart, loading } = useCart();

  return (
    <StyledButton
      type="primary"
      htmlType="button" 
      icon={<ShoppingCartOutlined />}
      onClick={() => insertProductInCart(productId)}
      loading={loading}
    >
      Adicionar ao carrinho
    </StyledButton>
  );
};

export default CartInsert;