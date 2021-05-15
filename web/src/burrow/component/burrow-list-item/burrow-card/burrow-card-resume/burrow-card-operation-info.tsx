import { BurrowOpeRowState, useBurrowOpeDispatcher } from '@burrow-operation'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Spinner, useStyleConfig } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'

type Props = {
  burrowOpeRowState?: BurrowOpeRowState
}

export const BurrowOperationInformation: FunctionComponent<Props> = ({ burrowOpeRowState }) => {
  const style = useStyleConfig('ui/burrow-operation-info-box')
  const { clearBurrowOpeMessage } = useBurrowOpeDispatcher()

  if (!burrowOpeRowState) {
    return null
  }

  const { status, operationName } = burrowOpeRowState

  switch (status) {
    case RequestStatus.success:
      return (
        <Flex sx={style} bg="green.100">
          <Box as="span">
            Operation <b>{operationName}</b> succeeded
          </Box>
          <IconButton
            onClick={clearBurrowOpeMessage(burrowOpeRowState)}
            aria-label="close"
            bg="green.500"
            color="green.900"
            size="xs"
            icon={<CloseIcon />}
          />
        </Flex>
      )
    case RequestStatus.pending:
      return (
        <Flex sx={style} position="absolute" bg="blue.200">
          <Box as="span">
            Operation <b>{operationName}</b> is pending
          </Box>
          <Spinner size="xs" />
        </Flex>
      )
    case RequestStatus.error:
      return (
        <Flex sx={style} bg="red.100">
          <Box as="span">
            Operation <b>{operationName}</b> failed
          </Box>
          <IconButton
            onClick={clearBurrowOpeMessage(burrowOpeRowState)}
            aria-label="close"
            bg="red.500"
            color="red.900"
            size="xs"
            icon={<CloseIcon />}
          />
        </Flex>
      )
    default:
      return null
  }
}
