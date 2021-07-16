import { BurrowList } from '@burrow'
import React, { FunctionComponent } from 'react'
import { ValidatePageWrapper } from '../../wrapper/validate-page-wrapper'

export const CheckerBurrowsPage: FunctionComponent = () => (
  <ValidatePageWrapper checkIsUserConnected checkIsValidChecker>
    <BurrowList />
  </ValidatePageWrapper>
)
