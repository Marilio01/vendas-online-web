import { useCallback, useEffect, useRef } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { URL_CART } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { CartType } from '../../../shared/types/CartType';

export const useCart = () => {
  const { request } = useRequests();
  const { loading, user } = useGlobalReducer();
  const { cart, refreshCart, updateItemAmount } = useCartReducer();

  const hasFetchedCart = useRef(false);
  useEffect(() => {
    if (user?.id && !hasFetchedCart.current) {
      refreshCart();
      hasFetchedCart.current = true;
    }
  }, [user?.id, refreshCart]);

useEffect(() => {
  if (user?.id && !hasFetchedCart.current) {
    refreshCart();
    hasFetchedCart.current = true;
  }
}, [user?.id, refreshCart]);

  const removeProductFromCart = useCallback(async (productId: number) => {
    await request(
      `${URL_CART}/product/${productId}`,
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Produto removido!',
    );
    await refreshCart();
  }, [request, refreshCart]);

  const updateProductAmount = useCallback(async (cartItem: CartType, newAmount: number) => {
    if (newAmount <= 0) {
      await removeProductFromCart(cartItem.product.id);
      return;
    }
    updateItemAmount(cartItem.id, newAmount);
    await request(
      URL_CART,
      MethodsEnum.PATCH,
      undefined,
      { productId: cartItem.product.id, amount: newAmount },
    );
    await refreshCart();
  }, [request, refreshCart, removeProductFromCart, updateItemAmount]);

  const insertProductInCart = useCallback(async (productId: number) => {
    await request(
      URL_CART,
      MethodsEnum.POST,
      undefined,
      { amount: 1, productId },
      'Produto adicionado!',
    );
    await refreshCart();
  }, [request, refreshCart]);

  return {
    cart,
    loading,
    insertProductInCart,
    updateProductAmount,
    removeProductFromCart,
  };
};