import { RouteObject } from 'react-router-dom';
import OrderClientListScreen from './screens/OrderClientListScreen'; // A nova tela de lista
import OrderClientDetailScreen from './screens/OrderClientDetailScreen';

export enum OrderClientRoutesEnum {
  ORDER_CLIENT = '/compras',
  ORDER_CLIENT_DETAIL = '/compras/:orderId', 
}

export const orderClientScreens: RouteObject[] = [
  {
    path: OrderClientRoutesEnum.ORDER_CLIENT,
    element: <OrderClientListScreen />,
  },
  {
    path: OrderClientRoutesEnum.ORDER_CLIENT_DETAIL,
    element: <OrderClientDetailScreen />,
  },
];