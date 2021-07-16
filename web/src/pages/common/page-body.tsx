/* eslint-disable */
import { checkerRoutes } from '@config'
import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

export const PageBody: FunctionComponent = () => (
  <Switch>
    {checkerRoutes.map((route, index: number) => {
      return (
        <Route key={index} path={route.path} exact={route.exact} children={<route.component />} />
      )
    })}
  </Switch>
)
