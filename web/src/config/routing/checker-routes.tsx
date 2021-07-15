/* eslint-disable */
import { BurrowList } from '@burrow'
import { CreateBurrowForm } from '@burrow-operation'
import { CfmmPage, CheckerCfmmOperationsPage, HomePage } from '@pages'
import React from 'react'
import { Link } from 'react-router-dom'

export type CheckerRoute = {
  path: string
  exact: boolean
  menu: () => React.ReactElement | null
  component: () => React.ReactElement
}

// order is imporant
export const userConnectedRoutes: CheckerRoute[] = [
  {
    path: '/checker/:address/cfmm/actions',
    exact: true,
    menu: () => null,
    component: () => <CheckerCfmmOperationsPage />,
  },
  {
    path: '/checker/:address/burrows',
    exact: true,
    menu: () => null,
    component: () => <BurrowList />,
  },
  {
    path: '/checker/:address/burrows/new',
    exact: true,
    menu: () => null,
    component: () => <CreateBurrowForm />,
  },
  {
    path: '/cfmm',
    exact: true,
    menu: () => <Link to="/cfmm">Cfmm actions</Link>,
    component: () => <CfmmPage />,
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
    component: () => <HomePage />,
  },
]
