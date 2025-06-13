import { RouteObject } from 'react-router-dom';
import PersonalData from './screens/PersonalData';

export enum ClientRoutesEnum {
  MEUS_DADOS = '/meus-dados',
}

export const clientScreens: RouteObject[] = [
  {
    path: ClientRoutesEnum.MEUS_DADOS,
    element: <PersonalData />,
  },
];
