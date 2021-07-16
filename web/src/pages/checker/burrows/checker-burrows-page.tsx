import { BurrowList } from '@burrow'
import React, { FunctionComponent } from 'react'
import { UserConnectedPageWrapper } from '../../user-connected-page-wrapper'

export const CheckerBurrowsPage: FunctionComponent = () => (
  <UserConnectedPageWrapper>
    <BurrowList />
  </UserConnectedPageWrapper>
)
