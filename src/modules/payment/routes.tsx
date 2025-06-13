import { RouteObject } from 'react-router-dom';
import Payment from './screens/Payment';

export enum PaymentRoutesEnum {
  PAYMENT = '/payment',
}

export const paymentScreens: RouteObject[] = [
  {
    path: PaymentRoutesEnum.PAYMENT,
    element: <Payment />,
  },
];
