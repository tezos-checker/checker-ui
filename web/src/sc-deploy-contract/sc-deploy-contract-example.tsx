import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { ScDeployContractRowState } from './state/sc-deploy-contract.type'
import { useDeployContractData } from './state/useDeployContractData'
import { useDispatchDeployContract } from './state/useDispatchDeployContract'

export const ScDeployContractExample: FunctionComponent = () => {
  const deployContractList = useDeployContractData()
  const scDeployContract = useDispatchDeployContract()

  return (
    <>
      <Box m={'25px'}>
        <h2>Opérations</h2>
        <HStack>
          <Button onClick={scDeployContract}>Deploy contract</Button>
        </HStack>
      </Box>

      <Box m={'10px'} border={'1px solid'} borderColor={'gray.600'}>
        {deployContractList.map(
          ({ id, wallet, opeStep, status, errMsg }: ScDeployContractRowState) => (
            <Box key={id} my={'15px'} p={'5px'} bg={'gray.300'}>
              <Flex>
                <Box flex={0.2}>{id}</Box>
                <Box flex={0.2}>{wallet ? wallet.address : ''}</Box>
                <Box flex={0.2}>{opeStep}</Box>
                <Box flex={0.2}>{status}</Box>
                <Box flex={0.2}>{errMsg}</Box>
              </Flex>
            </Box>
          ),
        )}
      </Box>
    </>
  )
}
