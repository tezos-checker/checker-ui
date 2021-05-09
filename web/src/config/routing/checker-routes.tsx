/* eslint-disable */
import { HomePage } from '@pages'
import React from 'react'
import { Link } from 'react-router-dom'
import { NewBurrow } from '../../burrow/new-burrow/new-burrow'
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
    component: () => <NewBurrow />,
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
