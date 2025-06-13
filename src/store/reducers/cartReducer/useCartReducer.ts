import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { CartType } from "../../../shared/types/CartType";
import { setCartAction, updateItemAmountAction } from "."; 

export const useCartReducer = () => {
  const dispatch = useDispatch();
  const { cart } = useAppSelector((state) => state.cartReducer);

  const setCarts = (response: { cartProduct: CartType[] }) => {
    if (response && response.cartProduct) {
      dispatch(setCartAction(response.cartProduct));
    } else {
      dispatch(setCartAction([]));
    }
  };

  const updateItemAmount = (id: number, amount: number) => {
    dispatch(updateItemAmountAction({ id, amount }));
  };

  const clearCart = () => {
    dispatch(setCartAction([]));
  };

  return {
    cart,
    setCarts,
    updateItemAmount,
    clearCart,
  };
};