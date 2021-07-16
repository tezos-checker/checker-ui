import { CheckerCfmmOperations } from '@checker'
import React, { FunctionComponent } from 'react'
import { ValidatePageWrapper } from '../wrapper/validate-page-wrapper'

export const CheckerSelectedPage: FunctionComponent = () => (
  <ValidatePageWrapper checkIsUserConnected={false} checkIsValidChecker>
    <CheckerCfmmOperations />
  </ValidatePageWrapper>
)
