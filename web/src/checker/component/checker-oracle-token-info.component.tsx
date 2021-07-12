import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

type Props = {
  oracle: string
  token: string
}

export const CheckerOracleTokenInfo: FunctionComponent<Props> = ({ oracle, token }) => (
  <HStack justifyContent="space-between" width="100%" mt="20px" mb="40px">
    <VStack spacing={0} alignItems="flex-start" flex=".5">
      <Box>Oracle adress</Box>
      <Box>{oracle}</Box>
    </VStack>
    <VStack spacing={0} alignItems="flex-start" flex=".5">
      <Box>Token</Box>
      <Box>{token}</Box>
    </VStack>
  </HStack>
)
