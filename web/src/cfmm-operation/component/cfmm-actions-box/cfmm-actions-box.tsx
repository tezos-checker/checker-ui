import { Box } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { CfmmOperationsMemoryRouter } from './cfmm-actions-memory-router'

export const CfmmActionsBox: FunctionComponent = () => (
  <Box w="600px" mx="auto" mt="5vh" p="20px">
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Box fontSize="3xl">Cfmm actions</Box>
    </Flex>

    <CfmmOperationsMemoryRouter />
  </Box>
)
