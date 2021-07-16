import { Box, HStack, VStack } from '@chakra-ui/react'
import { truncateStringInTheMiddle } from '@shared/utils'
import React, { FunctionComponent } from 'react'

type Props = {
  oracle: string
  address: string
}

export const CheckerOracleTokenInfo: FunctionComponent<Props> = ({ oracle, address }) => (
  <HStack justifyContent="space-between" width="100%" mt="20px" mb="40px">
    <VStack spacing={0} alignItems="flex-start" flex=".5">
      <Box>Oracle adress</Box>
      <Box>{truncateStringInTheMiddle(oracle)}</Box>
    </VStack>
    <VStack spacing={0} alignItems="flex-start" flex=".5">
      <Box>Token</Box>
      <Box>{truncateStringInTheMiddle(address)}</Box>
    </VStack>
  </HStack>
)
