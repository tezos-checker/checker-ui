import { CloseIcon } from '@chakra-ui/icons'
import { Box, IconButton, Image, Progress } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import FoxJumpingGif from '../../../assets/images/fox-jumping.gif'
import OopsGif from '../../../assets/images/oops.gif'
import { BurrowRowState } from '../../state/burrow-state.type'
import { useDispatchRemoveBurrow } from '../../state/useDispatchRemoveBurrow'

type Props = BurrowRowState

const BurrowCreationOnPending: FunctionComponent<Props> = (props) => (
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

const BurrowCreationFailed: FunctionComponent<Props> = ({
  burrowId,
  currentOperation: { errorMsg },
}) => {
  const removeBurrow = useDispatchRemoveBurrow(burrowId)
  return (
    <Box border="1px solid" w="300px" m="10px" borderRadius="5px" position="relative">
      <IconButton
        onClick={removeBurrow}
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

export const BurrowItemPendingCreation: FunctionComponent<Props> = (props) =>
  props.currentOperation.status === RequestStatus.pending ? (
    <BurrowCreationOnPending {...props} />
  ) : (
    <BurrowCreationFailed {...props} />
  )
