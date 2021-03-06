import { Box } from '@chakra-ui/layout'
import { CloseButton, Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BurrowRowState } from '../../state/burrow-state.type'
import { BurrowOperationsMemoryRouter } from './burrow-actions-memory-router'

type Props = {
  burrow: BurrowRowState
  onCloseActions: () => void
}

export const BurrowActionsBox: FunctionComponent<Props> = ({ onCloseActions, burrow }) => (
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
      Burrow - {burrow.scAddress}
    </Box>
    <BurrowOperationsMemoryRouter onCloseActions={onCloseActions} burrow={burrow} />
  </Box>
)
