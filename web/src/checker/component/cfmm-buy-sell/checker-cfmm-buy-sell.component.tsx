import { CfmmOpeBuyKitForm } from '@burrow-operation'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Checker } from '@config'
import React, { FunctionComponent } from 'react'
import { CheckerOracleTokenInfo } from '../checker-oracle-token-info.component'

type Props = {
  checker: Checker
}

export const CheckerCfmmBuySell: FunctionComponent<Props> = ({ checker }) => (
  <Box>
    <Flex
      w="350px"
      height="400px"
      m="auto"
      borderRadius="5px"
      position="relative"
      flexDirection="column"
    >
      <Heading as="h3" size="lg" textAlign="center">
        {checker.name}
      </Heading>
      <CheckerOracleTokenInfo oracle={checker.oracle} address={checker.address} />

      <Flex
        border="1px solid"
        alignItems="center"
        justifyContent="center"
        p="10px"
        flexDirection="column"
        mt="15px"
      >
        <CfmmOpeBuyKitForm address={checker.address} />
      </Flex>
    </Flex>
  </Box>
)
