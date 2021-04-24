import React, { FunctionComponent } from 'react'
import { ScOperationExample } from '../sc-operation/sc-operation-example'
import { WalletConnector } from '../wallet/wallet-connector/walled-connector'

export const HomePage: FunctionComponent = () => (
  <>
    <WalletConnector />
    <ScOperationExample />
  </>
)
