import { CreateBurrowForm } from '@burrow-operation'
import React, { FunctionComponent } from 'react'
import { UserConnectedPageWrapper } from '../../user-connected-page-wrapper'

export const CheckerNewBurrowsPage: FunctionComponent = () => (
  <UserConnectedPageWrapper>
    <CreateBurrowForm />
  </UserConnectedPageWrapper>
)
