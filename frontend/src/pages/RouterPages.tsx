import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from './Auth/Login.page';
import { MainPage } from './Main/Main.page';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RegisterPage } from './Auth/Register.page';
import { StorePage } from './Store/Store.page';
import { CoursePage } from './Courses/Course/Course.page';
import { CoursesPage } from './Courses/Courses.page';
import { LessonPage } from './Lesson/Lesson.page';

interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = '/signin',
  REGISTER = '/signup',
  MAIN = '/',
  STORE = '/store',
  COURSE = '/courses/:id',
  COURSES = '/courses',
  LESSON = '/lessons/:id',
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, exact: true, component: LoginPage },
  { path: RouteNames.REGISTER, exact: true, component: RegisterPage },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.MAIN, exact: true, component: MainPage },
  { path: RouteNames.STORE, exact: false, component: StorePage },
  { path: RouteNames.COURSE, exact: true, component: CoursePage },
  { path: RouteNames.COURSES, exact: true, component: CoursesPage },
  { path: RouteNames.LESSON, exact: true, component: LessonPage },
];

export function RouterPages() {
  const { isLogin } = useTypedSelector((state) => state.auth);

  if (isLogin) {
    return (
      <Switch>
        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
        ))}
        <Redirect to={RouteNames.MAIN} />
      </Switch>
    );
  }

  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
      ))}
      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  );
}
