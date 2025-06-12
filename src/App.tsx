import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { productScreens } from './modules/product/routes';
import { useNotification } from './shared/hooks/useNotification';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';
import { useRequests } from './shared/hooks/useRequests';
import { useEffect } from 'react';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { categoryScreens } from './modules/category/routes';
import { orderScreens } from './modules/orders/routes';
import { userScreens } from './modules/user/routes';
import { registerRoutes } from './modules/register/routes';
import { UsuarioDisplayRoutes } from './modules/usuarioDisplay/routes';
import { changePasswordRoutes } from './modules/changePassword/routes';

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...productScreens,
  ...categoryScreens,
  ...firstScreenRoutes,
  ...userScreens,
  ...orderScreens,
  ...registerRoutes,
  ...UsuarioDisplayRoutes,
  ...changePasswordRoutes,
].map((route) => ({
  ...route,
  loader: () => verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      request(URL_USER, MethodsEnum.GET, setUser);
    }
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}
export default App;
