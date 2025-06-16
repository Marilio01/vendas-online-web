import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { CartType } from "../../../shared/types/CartType";
import { URL_CART } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { setCartAction, updateItemAmountAction, removeItemAction } from ".";
import ConnectionAPI from '../../../shared/functions/connection/connectionAPI';

export const useCartReducer = () => {
  const dispatch = useDispatch();
  const { cart } = useAppSelector((state) => state.cartReducer);

const refreshCart = useCallback(async () => {
  const result = await ConnectionAPI.connect<{ cartProduct: CartType[] }>(URL_CART, MethodsEnum.GET);
  if (result && result.cartProduct) {
    dispatch(setCartAction(result.cartProduct));
  } else {
    dispatch(setCartAction([]));
  }
}, [dispatch]);


  const updateItemAmount = useCallback((id: number, amount: number) => {
    dispatch(updateItemAmountAction({ id, amount }));
  }, [dispatch]);

  const removeItem = useCallback((id: number) => {
    dispatch(removeItemAction(id));
  }, [dispatch]);
  
  const clearCart = useCallback(() => {
    dispatch(setCartAction([]));
  }, [dispatch]);

  return {
    cart,
    updateItemAmount,
    removeItem,
    clearCart,
    refreshCart,
  };
};