import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_ORDER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { CreateOrderDTO } from '../../../shared/dtos/CreateOrder.dto';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export const useCreateOrder = () => {
  const { request } = useRequests();
  const { loading } = useGlobalReducer();
  const { clearCart } = useCartReducer();

  const createOrder = async (order: CreateOrderDTO) => {
    const result = await request(URL_ORDER, MethodsEnum.POST, undefined, order);
    
    if (result) {
      clearCart();
    }

    return result;
  };

  return {
    loading,
    createOrder,
  };
};