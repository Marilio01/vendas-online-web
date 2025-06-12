import { useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { URL_CART } from '../../../shared/constants/urls';
import { InsertCart } from '../../../shared/dtos/InsertCart.dto';
import { refreshCart } from './useCart';

export const useInsertCart = (productId: number) => {
  const { request, loading } = useRequests();

  const [cartProduct, setCartProduct] = useState<InsertCart>({
    productId,
    amount: 1,
  });

  const handleInsertCart = async () => {
    await request(
      URL_CART,
      MethodsEnum.POST,
      () => {
        console.log('1. SUCESSO NO POST! Tentando chamar refreshCart...');
        refreshCart();
      },
      cartProduct,
      'Produto adicionado ao carrinho!',
    );
  };

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { value: any } },
    field: keyof InsertCart,
    isNumber?: boolean,
  ) => {
    const value = event.target.value;
    setCartProduct((prev) => ({
      ...prev,
      [field]: isNumber ? Number(value) : value,
    }));
  };

  return {
    loading,
    onChangeInput,
    handleInsertCart,
  };
};