import { UserType } from '../../modules/login/types/UserType';
import { AddressType } from './AddressType';
import { PaymentType } from './PaymentType';
import { OrderProductType } from './OrderProductType';

export interface OrderType {
  id: number;
  date: string;
  userId: number;
  user: UserType;
  amountProducts: number;
  payment?: PaymentType;
  address?: AddressType;
  ordersProduct?: OrderProductType[];
}
