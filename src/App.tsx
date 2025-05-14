import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { productScreens } from './modules/product/routes';
import { useNotification } from './shared/hooks/useNotification';
import { verifyLoggedIn } from './shared/functions/connection/auth';
import { useGlobalContext } from './shared/hooks/useGlobalContext';
import { useRequests } from './shared/hooks/useRequests';
import { useEffect } from 'react';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';

const routes: RouteObject[] = [...loginRoutes];
  const routesLoggedIn: RouteObject[] = [...productScreens, ...firstScreenRoutes].map((route) => ({
    ...route,
    loader: () => verifyLoggedIn,
  }));

  const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalContext();
  const { request} = useRequests();

  useEffect(() =>{
    request(URL_USER, MethodsEnum.GET, setUser)
  }, [])
  
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}
export default App;
