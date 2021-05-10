/* eslint-disable */
import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useCheckerRoute } from '../../config/routing/useCheckerRoute.hook'

export const PageBody: FunctionComponent = () => {
  const { checkerRoutes } = useCheckerRoute()

  console.log(checkerRoutes)

  return (
    <Switch>
      {checkerRoutes.map((route, index: number) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} children={<route.component />} />
        )
      })}
    </Switch>
  )
}
