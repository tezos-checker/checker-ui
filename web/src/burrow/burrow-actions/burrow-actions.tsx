import { Box } from '@chakra-ui/layout'
import { CloseButton, Flex } from '@chakra-ui/react'
import { truncateStringInTheMiddle } from '@shared/utils'
import React, { FunctionComponent } from 'react'
import { BurrowActionsMemoryRouter } from './actions/burrow-actions-memory-router'

type Props = {
  onCloseActions: () => void
}

export const BurrowActions: FunctionComponent<Props> = ({ onCloseActions }) => (
  <Box w="600px" mx="auto" mt="5vh" p="20px">
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Box fontSize="3xl">Actions</Box>
      <CloseButton onClick={onCloseActions} size="lg" />
    </Flex>
    <Box textAlign="center" mt="10px">
      Burrow - xxxx - {truncateStringInTheMiddle('testtesttesttesttest')}
    </Box>
    <BurrowActionsMemoryRouter />
  </Box>
)
