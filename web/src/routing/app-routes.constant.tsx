/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'
import VirtualizedListMock from '../../src/mock/virtualized-list-mock'
import { WalletV2 } from '../../src/modules/refactoring/wallet/walled-v2.component'
import HomePage from '../../src/pages/home.page'

export type AppRoute = {
  path: string
  exact: boolean
  isPrivate: boolean
  menu: () => React.ReactElement
  component: () => React.ReactElement
}

export const appRoutes: AppRoute[] = [
  {
    path: '/old',
    exact: true,
    menu: () => <Link to="/old">Original Site</Link>,
    component: () => <HomePage />,
    isPrivate: false,
  },
  {
    path: '/virtualized-list',
    exact: true,
    menu: () => <Link to="/virtualized-list">Virtual list example (private)</Link>,
    component: () => <VirtualizedListMock />,
    isPrivate: true,
  },
  {
    path: '/',
    exact: false,
    menu: () => <Link to="/">New Site</Link>,
    component: () => <WalletV2 />,
    isPrivate: false,
  },
]
