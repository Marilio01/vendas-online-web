import { useEffect, useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { OrderType } from '../../../shared/types/OrderType';
import { URL_ORDER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export const useOrderClient = () => {
  const { request } = useRequests();
  const { loading } = useGlobalReducer();
  const [orders, setOrders] = useState<OrderType[]>([]);

  const fetchUserOrders = async () => {
    const result = await request<OrderType[]>(URL_ORDER, MethodsEnum.GET);

    if (result) {
      setOrders(result);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return {
    orders,
    loading,
  };
};