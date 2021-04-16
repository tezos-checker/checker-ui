/* eslint-disable */
import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAppRoutes } from '../routing/app-routes.hook'

export const AppRouterContentMock: FunctionComponent = () => {
  const { appRoutes } = useAppRoutes()

  return (
    <Switch>
      {appRoutes.map((route, index: number) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} children={<route.component />} />
        )
      })}
    </Switch>
  )
}
