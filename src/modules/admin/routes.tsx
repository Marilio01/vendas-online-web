import { RouteObject } from 'react-router-dom';
import Admin from './screens/Admin';
import AdminInsert from './screens/AdminInsert';


export enum AdminRoutesEnum {
  ADMIN = '/admin',
  ADMIN_INSERT = '/admin/insert',
}

export const adminScreens: RouteObject[] = [
  {
    path: AdminRoutesEnum.ADMIN,
    element: <Admin />,
  },
  {
    path: AdminRoutesEnum.ADMIN_INSERT,
    element: <AdminInsert />,
  },
];
