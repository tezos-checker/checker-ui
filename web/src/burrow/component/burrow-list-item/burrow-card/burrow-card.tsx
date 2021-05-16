import { getBurrowOperation, useBurrowOpeDispatcher } from '@burrow-operation'
import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { ClipboardCopy } from '@shared/ui'
import { truncateStringInTheMiddle } from '@shared/utils'
import { getStorage } from '@storage'
import React, { FunctionComponent } from 'react'
import FoxHeadSvg from '../../../../assets/images/fox-head.svg'
import { BurrowRowState } from '../../../state/burrow-state.type'
import { useBurrowDispatcher } from '../../../state/useBurrowDispatcher.hook'
import { BurrowOperationInformation } from './burrow-card-resume/burrow-card-operation-info'
import { CardItemMemoryRouter } from './burrow-card-tab-router'

type Props = {
  burrowRowState: BurrowRowState
}

export const BurrowCard: FunctionComponent<Props> = ({ burrowRowState }) => {
  const storage = getStorage(burrowRowState.burrowId)
  const burrowOperation = getBurrowOperation(burrowRowState.burrowId)
  const { deleteBurrow } = useBurrowDispatcher()
  const { deleteBurrowOperation } = useBurrowOpeDispatcher()

  return (
    <Flex
      border="1px solid"
      w="350px"
      height="400px"
      m="10px"
      borderRadius="5px"
      position="relative"
      flexDirection="column"
    >
      <Flex alignItems="center" justifyContent="center" bg="gray.600" color="white" p="5px">
        <Image src={FoxHeadSvg} h={'30px'} />
        <Box as="span" mx="10px">
          {truncateStringInTheMiddle(burrowRowState.scAddress)}
        </Box>
        <ClipboardCopy text={burrowRowState.scAddress} />
      </Flex>
      <Flex flex="1" overflow={'auto'} flexDirection="column">
        <BurrowOperationInformation burrowOpeRowState={burrowOperation} />

        <CardItemMemoryRouter
          burrowRowState={burrowRowState}
          storage={storage}
          burrowOperation={burrowOperation}
        />
        <Button onClick={deleteBurrow(burrowRowState.burrowId)}>DELETE BURROW</Button>
        {burrowOperation ? (
          <Button onClick={deleteBurrowOperation(burrowOperation.burrowId)}>DELETE OPE</Button>
        ) : null}
      </Flex>
    </Flex>
  )
}
