import { RouteObject } from 'react-router-dom';
import User from './screens/User';
import Admin from './screens/Admin';
import AdminInsert from './screens/AdminInsert';

export enum UserRoutesEnum {
  ADMIN = '/admin',
  ADMIN_INSERT = '/admin/insert',
  USER = '/user'
}

export const userScreens: RouteObject[] = [
  {
    path: UserRoutesEnum.ADMIN,
    element: <Admin />,
  },
  {
    path: UserRoutesEnum.ADMIN_INSERT,
    element: <AdminInsert />,
  },
  {
    path: UserRoutesEnum.USER,
    element: <User />,
  }
];
