import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { useNotification } from './shared/hooks/useNotification';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';
import { useRequests } from './shared/hooks/useRequests';
import { useEffect } from 'react';
import { createAuthLoader, getAuthorizationToken } from './shared/functions/connection/auth';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { UserTypeEnum } from './shared/enums/userType.enum';
import { loginRoutes } from './modules/login/routes';
import { productScreens } from './modules/product/routes';
import { categoryScreens } from './modules/category/routes';
import { orderScreens } from './modules/orders/routes';
import { userScreens } from './modules/user/routes';
import { registerRoutes } from './modules/register/routes';
import { UsuarioDisplayRoutes } from './modules/usuarioDisplay/routes';
import { changePasswordRoutes } from './modules/changePassword/routes';
import { cartScreens } from './modules/cart/routes';
import { checkoutScreens } from './modules/checkout/routes';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { paymentScreens } from './modules/payment/routes';
import { orderClientScreens } from './modules/orderClient/routes';
import { clientScreens } from './modules/client/routes';
import { adminScreens } from './modules/admin/routes';


const publicRoutes: RouteObject[] = [
    ...loginRoutes, 
    ...registerRoutes
];

const adminRoutes: RouteObject[] = [
    ...productScreens,
    ...categoryScreens,
    ...userScreens,
    ...orderScreens
].map((route) => ({
    ...route,
    loader: createAuthLoader([UserTypeEnum.Admin, UserTypeEnum.Root]),
}));

const rootRoutes: RouteObject[] = [
    ...adminScreens,
].map((route) => ({
    ...route,
    loader: createAuthLoader([UserTypeEnum.Root]),
}));

const commonUserRoutes: RouteObject[] = [
    ...firstScreenRoutes,
    ...UsuarioDisplayRoutes,
    ...changePasswordRoutes,
    ...cartScreens,
    ...checkoutScreens,
    ...paymentScreens,
    ...orderClientScreens,
    ...clientScreens,
].map((route) => ({
    ...route,
    loader: createAuthLoader(),
}));

const router: RemixRouter = createBrowserRouter([
    ...publicRoutes,
    ...rootRoutes,
    ...adminRoutes,
    ...commonUserRoutes,
]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      request(URL_USER, MethodsEnum.GET, setUser);
    }
  }, [request, setUser]);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}
export default App;