import { RouteObject } from 'react-router-dom';

import UsuarioDisplay from './screens/UsuarioDisplayScreen';

export enum UsuarioDisplayRoutesEnum {
  USUARIO_DISPLAY = '/display',
}

export const UsuarioDisplayRoutes: RouteObject[] = [
  {
    path: UsuarioDisplayRoutesEnum.USUARIO_DISPLAY,
    element: <UsuarioDisplay />,
  },
];
