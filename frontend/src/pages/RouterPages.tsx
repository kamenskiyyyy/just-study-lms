import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage } from './Auth/Login.page';
import { MainPage } from './Main/Main.page';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RegisterPage } from './Auth/Register.page';

interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = '/signin',
  REGISTER = '/signup',
  MAIN = '/'
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, exact: true, component: LoginPage },
  { path: RouteNames.REGISTER, exact: true, component: RegisterPage },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.MAIN, exact: true, component: MainPage },
];


export function RouterPages() {
  const { isLogin } = useTypedSelector(state => state.auth);

  if (isLogin) {
    return (
      <Switch>
        {privateRoutes.map(route =>
          <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />,
        )}
        <Redirect to={RouteNames.MAIN} />
      </Switch>
    );
  }

  return (
    <Switch>
      {publicRoutes.map(route =>
        <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />,
      )}
      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  );
}