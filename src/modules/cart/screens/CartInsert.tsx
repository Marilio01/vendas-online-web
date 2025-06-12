import { useInsertCart } from "../hooks/useInsertCart";
import { CartInsertContainer, StyledButton } from "../styles/CartInsert.styles";
import { ShoppingCartOutlined } from "@ant-design/icons";

type CartInsertProps = {
  productId: number;
};

const CartInsert = ({ productId }: CartInsertProps) => {
  const { handleInsertCart } = useInsertCart(productId);

  return (
    <CartInsertContainer>
      <StyledButton
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={handleInsertCart}
      >
        Adicionar ao carrinho
      </StyledButton>
    </CartInsertContainer>
  );
};

export default CartInsert;
