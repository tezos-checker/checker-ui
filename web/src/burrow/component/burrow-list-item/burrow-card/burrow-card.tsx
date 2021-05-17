import { useGetBurrowOperation } from '@burrow-operation'
import { Box, Flex, Image } from '@chakra-ui/react'
import { ClipboardCopy } from '@shared/ui'
import { truncateStringInTheMiddle } from '@shared/utils'
import { getStorage } from '@storage'
import React, { FunctionComponent } from 'react'
import FoxHeadSvg from '../../../../assets/images/fox-head.svg'
import { BurrowRowState } from '../../../state/burrow-state.type'
import { BurrowOperationInformation } from './burrow-card-resume/burrow-card-operation-info'
import { CardItemMemoryRouter } from './burrow-card-tab-router'

type Props = {
  burrow: BurrowRowState
}

export const BurrowCard: FunctionComponent<Props> = ({ burrow }) => {
  const storage = getStorage(burrow.burrowId)
  const burrowOperation = useGetBurrowOperation(burrow.burrowId)

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
          {truncateStringInTheMiddle(burrow.scAddress)}
        </Box>
        <ClipboardCopy text={burrow.scAddress} />
      </Flex>
      <Flex flex="1" overflow={'auto'} flexDirection="column">
        <BurrowOperationInformation burrowOpeRowState={burrowOperation} />
        <CardItemMemoryRouter burrow={burrow} storage={storage} burrowOperation={burrowOperation} />
      </Flex>
    </Flex>
  )
}
