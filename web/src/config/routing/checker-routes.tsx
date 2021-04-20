/* eslint-disable */
import { HomePageOld, HomePage, VirtualListExemplePage } from '@pages'
import React from 'react'
import { Link } from 'react-router-dom'

export type CheckerRoute = {
  path: string
  exact: boolean
  isPrivate: boolean
  menu: () => React.ReactElement
  component: () => React.ReactElement
}

// TODO delete once the project has started
const exempleRoutes = [
  {
    path: '/exemple/virtualized-list',
    exact: true,
    menu: () => <Link to="/exemple/virtualized-list">Virtual list example (private)</Link>,
    component: () => <VirtualListExemplePage />,
    isPrivate: true,
  },
  {
    path: '/exemple/store',
    exact: true,
    menu: () => <Link to="/exemple/store">Redux, Observable exemple</Link>,
    component: () => <VirtualListExemplePage />,
    isPrivate: false,
  },
]

export const checkerRoutes: CheckerRoute[] = [
  {
    path: '/old',
    exact: true,
    menu: () => <Link to="/old">Original Site</Link>,
    component: () => <HomePageOld />,
    isPrivate: false,
  },
  // TODO delete once the project has started
  ...exempleRoutes,
  {
    path: '/',
    exact: false,
    menu: () => <Link to="/">New Site</Link>,
    component: () => <HomePage />,
    isPrivate: false,
  },
]
