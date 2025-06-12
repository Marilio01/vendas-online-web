import { RouteObject } from "react-router-dom";
import Checkout from "./screens/Checkout";

export enum CheckoutRoutesEnum {
  CHECKOUT = '/checkout',
}

export const checkoutScreens: RouteObject[] = [
  {
    path: CheckoutRoutesEnum.CHECKOUT,
    element: <Checkout />,
  },
];
