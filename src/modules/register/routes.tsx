import { RouteObject } from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen';

export enum RegisterRoutesEnum {
  REGISTER = '/register',
}

export const registerRoutes: RouteObject[] = [
  {
    path: RegisterRoutesEnum.REGISTER,
    element: <RegisterScreen />,
  },
];
