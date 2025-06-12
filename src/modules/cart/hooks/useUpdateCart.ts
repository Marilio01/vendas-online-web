import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { URL_CART } from '../../../shared/constants/urls';
import { refreshCart } from './useCart';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { CartType } from '../../../shared/types/CartType';

export const useUpdateCart = () => {
  const { request } = useRequests();
  const { updateItemAmount } = useCartReducer();

  const handleUpdateAmount = async (cartItem: CartType, newAmount: number) => {
    if (newAmount <= 0) {
      await handleRemoveItem(cartItem.id);
      return;
    }
    
    const onSuccess = () => {
      updateItemAmount(cartItem.id, newAmount);
    };

    await request(
      URL_CART, 
      MethodsEnum.PATCH,
      onSuccess,
      { productId: cartItem.product.id, amount: newAmount },
    );
  };

  const handleRemoveItem = async (cartId: number) => {
    await request(
      `${URL_CART}/${cartId}`,
      MethodsEnum.DELETE,
      refreshCart,
    );
  };

  return {
    handleUpdateAmount,
  };
};