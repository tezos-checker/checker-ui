import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { SlideBox } from '@shared/ui'
import React, { FunctionComponent } from 'react'
import { TezosEstimateTest } from '../sandbox/tezos.estimate'
import { ScDeployContractExample } from '../sc-deploy-contract/sc-deploy-contract-example'
import { ScOperationExample } from '../sc-operation/sc-ope-example'
import { MyStorage } from '../sc-storage/my-storage'
import { WalletConnector } from '../wallet/wallet-connector/walled-connector'

export const HomePage: FunctionComponent = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <ScDeployContractExample />
      <Button onClick={onToggle}>Open right menu</Button>
      <WalletConnector />
      <br />
      <ScOperationExample />
      <br />
      <MyStorage />
      <br />
      <TezosEstimateTest />

      <SlideBox isOpen={isOpen} onClickOutSideMenu={onToggle}>
        <Box w={'30vw'}>TEST</Box>
      </SlideBox>
    </Box>
  )
}
