import React, { FunctionComponent } from 'react'
import HomePage from '../_old_/pages/home.page'
import { ConnectedNetwork } from '../_old_/state/connected.context'

export const HomePageOld: FunctionComponent = () => (
  <ConnectedNetwork>
    <HomePage />
  </ConnectedNetwork>
)
