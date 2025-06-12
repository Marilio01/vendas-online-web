import { useEffect } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { URL_CART } from '../../../shared/constants/urls';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { CartType } from '../../../shared/types/CartType';

let fetchCartInstance: () => Promise<void>;

export const useCart = () => {
  const { request } = useRequests();
  const { setCarts } = useCartReducer();

  const fetchCart = async () => {
    await request<{ cartProduct: CartType[] }>(URL_CART, MethodsEnum.GET, setCarts);
  };

  if (!fetchCartInstance) {
    fetchCartInstance = fetchCart;
  }

  useEffect(() => {
    fetchCart();
  }, []); 
};

export const refreshCart = () => {
  console.log('2. Função refreshCart FOI CHAMADA.');
  if (fetchCartInstance) {
    console.log('3. SUCESSO: fetchCartInstance EXISTE. Executando a busca...');
    return fetchCartInstance();
  } else {
    console.error('4. ERRO CRÍTICO: fetchCartInstance é UNDEFINED!');
  }
};