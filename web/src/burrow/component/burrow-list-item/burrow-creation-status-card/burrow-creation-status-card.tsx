import { BurrowOpeRowState, useBurrowOpeDispatcher, useGetBurrowOperation } from '@burrow-operation'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, IconButton, Image, Progress } from '@chakra-ui/react'
import { OperationStep, RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import FoxJumpingGif from '../../../../assets/images/fox-jumping.gif'
import OopsGif from '../../../../assets/images/oops.gif'
import { useBurrowDispatcher } from '../../../state/useBurrowDispatcher.hook'

const BurrowCreationOnPending: FunctionComponent<BurrowOpeRowState> = (props) => (
  <Box border="1px solid" w="300px" m="10px" borderRadius="5px">
    <Image src={FoxJumpingGif} w={'100%'} />
    <Box textAlign="center" fontSize="2xl" fontWeight="semibold">
      We are creating your burrow...
    </Box>
    <Progress size="xs" isIndeterminate m="10px" />
    <Box textAlign="center" fontWeight="normal" fontSize="xs">
      Be patient. Usually takes less than 45 secondes
    </Box>
  </Box>
)

const BurrowCreationFailed: FunctionComponent<BurrowOpeRowState> = ({ burrowId, errorMsg }) => {
  const { deleteBurrow } = useBurrowDispatcher()
  const { clearBurrowOpeMessage } = useBurrowOpeDispatcher()
  const burrowOperation = useGetBurrowOperation(burrowId)

  /*
    if the confirmation has failed, may be the burrow has been created successfully
    reason while we whill show the burrow card 
  */
  const onCloseCard = () => {
    if (burrowOperation && burrowOperation?.operationStep === OperationStep.confirm) {
      clearBurrowOpeMessage(burrowOperation)
    } else {
      deleteBurrow(burrowId)
    }
  }

  return (
    <Box border="1px solid" w="300px" m="10px" borderRadius="5px" position="relative">
      <IconButton
        onClick={onCloseCard}
        position="absolute"
        m={'5px '}
        top={0}
        right={0}
        variant="solid"
        colorScheme="blue"
        size="xs"
        icon={<CloseIcon />}
        aria-label="close"
      />
      <Image src={OopsGif} w={'100%'} />
      <Box textAlign="center" fontSize="2xl" fontWeight="semibold">
        Oups, <br />
        creating your burrow failed
      </Box>
      <Box textAlign="center" fontWeight="normal" fontSize="xs">
        {errorMsg}
      </Box>
    </Box>
  )
}

export const BurrowCreationStatusCard: FunctionComponent<BurrowOpeRowState> = (burrowOperation) =>
  burrowOperation.status === RequestStatus.pending ? (
    <BurrowCreationOnPending {...burrowOperation} />
  ) : (
    <BurrowCreationFailed {...burrowOperation} />
  )
