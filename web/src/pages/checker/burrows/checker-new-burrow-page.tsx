import { CreateBurrowForm } from '@burrow-operation'
import React, { FunctionComponent } from 'react'
import { ValidatePageWrapper } from '../../wrapper/validate-page-wrapper'

export const CheckerNewBurrowsPage: FunctionComponent = () => (
  <ValidatePageWrapper checkIsUserConnected checkIsValidChecker>
    <CreateBurrowForm />
  </ValidatePageWrapper>
)
