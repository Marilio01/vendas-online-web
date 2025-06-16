import { useEffect } from 'react';
import { URL_ORDER_ID } from '../../../shared/constants/urls';
import { useOrderReducer } from '../../../store/reducers/orderReducer/useOrderReducer';
import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';


export const useOrderClientDetail = (orderId?: string) => {
  const { order, setOrder } = useOrderReducer();
  const { request } = useRequests();
  const { loading } = useGlobalReducer();

  useEffect(() => {
    if (orderId) {
      request(URL_ORDER_ID.replace('{orderId}', orderId), MethodsEnum.GET, setOrder);
    }
  }, [orderId]);

  return {
    order,
    loading,
  };
};