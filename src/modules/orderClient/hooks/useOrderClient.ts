import { useEffect, useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { OrderType } from '../../../shared/types/OrderType';
import { URL_ORDER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';

export const useOrderClient = () => {
  const { request, loading } = useRequests();
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