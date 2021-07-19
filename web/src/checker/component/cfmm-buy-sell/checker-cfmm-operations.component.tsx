import { Box, Flex, Heading } from '@chakra-ui/react'
import { Checker, useRouteParams } from '@config'
import { GoToHomeArrow } from '@shared/ui'
import React, { FunctionComponent } from 'react'
import { CheckerOracleTokenInfo } from '../checker-oracle-token-info.component'
import { CheckerCfmmOperationsTab } from './checker-cfmm-operations-tab'

export const CheckerCfmmOperations: FunctionComponent = () => {
  // checker exists it as been validated by <ValidatePage />
  const checker = useRouteParams().checker as Checker

  return (
    <Box>
      <Flex
        w="350px"
        height="400px"
        m="auto"
        borderRadius="5px"
        position="relative"
        flexDirection="column"
      >
        <GoToHomeArrow />

        <Heading as="h3" size="lg" textAlign="center">
          {checker?.name}
        </Heading>
        <CheckerOracleTokenInfo oracle={checker.oracle} address={checker.address} />

        <Flex
          bg="gray.300"
          border="1px solid"
          alignItems="center"
          justifyContent="center"
          p="10px"
          flexDirection="column"
          mt="15px"
        >
          <CheckerCfmmOperationsTab checker={checker} />
        </Flex>
      </Flex>
    </Box>
  )
}
