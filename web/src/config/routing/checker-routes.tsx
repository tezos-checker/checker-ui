/* eslint-disable */
import { CreateBurrowForm } from '@burrow-operation'
import { CfmmPage, CheckerBurrowsPage, CheckerCfmmPage, HomePage } from '@pages'
import React from 'react'
import { Link } from 'react-router-dom'

export type CheckerRoute = {
  path: string
  exact: boolean
  menu: () => React.ReactElement | null
  component: () => React.ReactElement
}

// order is imporant
export const checkerRoutes: CheckerRoute[] = [
  {
    path: '/checker/:address/cfmm',
    exact: true,
    menu: () => null,
    component: () => <CheckerCfmmPage />,
  },
  {
    path: '/checker/:address/burrows',
    exact: true,
    menu: () => null,
    component: () => <CheckerBurrowsPage />,
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
