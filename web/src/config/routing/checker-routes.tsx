/* eslint-disable */
import { CreateBurrowForm } from '@burrow-operation'
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

// order is imporant
export const userConnectedRoutes: CheckerRoute[] = [
  {
    path: '/new-burrow',
    exact: true,
    menu: () => <Link to="/new-burrow">New Burrow</Link>,
    component: () => <CreateBurrowForm />,
  },
  {
    path: '/',
    exact: false,
    menu: () => <Link to="/">New Site</Link>,
    component: () => <HomePage />,
  },
]

// order is imporant
export const userDisconnectedRoutes: CheckerRoute[] = [
  {
    path: '/',
    exact: false,
    menu: () => <Link to="/">Login</Link>,
    component: () => <LoginPage />,
  },
]
