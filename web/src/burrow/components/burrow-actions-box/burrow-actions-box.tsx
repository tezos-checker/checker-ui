import { Box } from '@chakra-ui/layout'
import { CloseButton, Flex } from '@chakra-ui/react'
import { truncateStringInTheMiddle } from '@shared/utils'
import React, { FunctionComponent } from 'react'
import { BurrowRowState } from '../../state/burrow-state.type'
import { BurrowOperationsMemoryRouter } from './actions/burrow-actions-memory-router'

type Props = BurrowRowState & {
  onCloseActions: () => void
}

export const BurrowActionsBox: FunctionComponent<Props> = (props) => (
  <Box w="600px" mx="auto" mt="5vh" p="20px">
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Box fontSize="3xl">Actions</Box>
      <CloseButton onClick={props.onCloseActions} size="lg" />
    </Flex>
    <Box textAlign="center" mt="10px">
      Burrow - xxxx - {truncateStringInTheMiddle('testtesttesttesttest')}
    </Box>
    <BurrowOperationsMemoryRouter {...props} />
  </Box>
)
