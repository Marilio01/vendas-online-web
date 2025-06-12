import { RouteObject } from 'react-router-dom';
import { ChangePasswordScreen } from './screens/ChangePasswordScreen';

export enum ChangePasswordRoutesEnum {
  CHANGE = '/changePassword',
}

export const changePasswordRoutes: RouteObject[] = [
  {
    path: ChangePasswordRoutesEnum.CHANGE,
    element: <ChangePasswordScreen />,
  },
];
