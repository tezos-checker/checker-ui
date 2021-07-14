/* eslint-disable */
import { CreateBurrowForm } from '@burrow-operation'
import { BuySellPage, CfmmPage, HomePage } from '@pages'
import React from 'react'
import { Link } from 'react-router-dom'

export type CheckerRoute = {
  path: string
  exact: boolean
  menu: () => React.ReactElement
  component: () => React.ReactElement
}

// order is imporant
export const userConnectedRoutes: CheckerRoute[] = [
  {
    path: '/checker/:address/cfmm/buysell',
    exact: false,
    menu: () => <Link to="/">Buy / Sell</Link>,
    component: () => <BuySellPage />,
  },
  {
    path: '/cfmm',
    exact: true,
    menu: () => <Link to="/cfmm">Cfmm actions</Link>,
    component: () => <CfmmPage />,
  },
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
    component: () => <HomePage />,
  },
]
