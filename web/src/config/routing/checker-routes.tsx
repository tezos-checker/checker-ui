/* eslint-disable */
import { HomePage } from '@pages'
import React from 'react'
import { Link } from 'react-router-dom'
import { LoginPage } from '../../pages/login-page'

export type CheckerRoute = {
  path: string
  exact: boolean
  menu: () => React.ReactElement
  component: () => React.ReactElement
}

export const userConnectedRoutes: CheckerRoute[] = [
  {
    path: '/',
    exact: false,
    menu: () => <Link to="/">New Site</Link>,
    component: () => <HomePage />,
  },
]
export const userDisconnectedRoutes: CheckerRoute[] = [
  {
    path: '/',
    exact: false,
    menu: () => <Link to="/">Login</Link>,
    component: () => <LoginPage />,
  },
]
