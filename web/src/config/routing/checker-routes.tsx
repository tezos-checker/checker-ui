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
  isPrivate: boolean
}

// order is imporant
export const routes: CheckerRoute[] = [
  {
    path: '/checker/:address/cfmm/actions',
    exact: true,
    menu: () => null,
    component: () => <CheckerCfmmOperationsPage />,
    isPrivate: false,
  },
  {
    path: '/checker/:address/burrows',
    exact: true,
    menu: () => null,
    component: () => <BurrowList />,
    isPrivate: true,
  },
  {
    path: '/checker/:address/burrows/new',
    exact: true,
    menu: () => null,
    component: () => <CreateBurrowForm />,
    isPrivate: true,
  },
  {
    path: '/cfmm',
    exact: true,
    menu: () => <Link to="/cfmm">Cfmm actions</Link>,
    component: () => <CfmmPage />,
    isPrivate: false,
  },

  {
    path: '/',
    exact: false,
    menu: () => <Link to="/">New Site</Link>,
    component: () => <HomePage />,
    isPrivate: false,
  },
]
