import { RouteObject } from "react-router-dom";
import Cart from "./screens/Cart";

export enum CartRoutesEnum {
  CART = '/cart',
}

export const cartScreens: RouteObject[] = [
  {
    path: CartRoutesEnum.CART,
    element: <Cart />,
  },
];
