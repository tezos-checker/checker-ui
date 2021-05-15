import { getBurrowOperation } from '@burrow-operation'
import { DragHandleIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Image, useDisclosure, VStack } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { ClipboardCopy, SlideBox } from '@shared/ui'
import { truncateStringInTheMiddle } from '@shared/utils'
import { getStorage, StorageBurrowValues } from '@storage'
import React, { FunctionComponent } from 'react'
import FoxHeadSvg from '../../../../assets/images/fox-head.svg'
import { BurrowRowState } from '../../../../state/burrow-state.type'
import { BurrowActionsBox } from '../../../burrow-actions-box/burrow-actions-box'
import { BurrowOperationInformation } from './burrow-card-operation-info'

type Props = {
  burrowRowState: BurrowRowState
}

export const BurrowCardResume: FunctionComponent<Props> = ({ burrowRowState }) => {
  const { isOpen, onToggle } = useDisclosure()
  const burrowOperation = getBurrowOperation(burrowRowState.burrowId)
  const storage = getStorage(burrowRowState.burrowId)

  return (
    <>
      <StorageBurrowValues storageRow={storage} />
      <Box border="1px solid" w="300px" m="10px" borderRadius="5px" position="relative">
        <Flex alignItems="center" justifyContent="center" bg="gray.600" color="white" p="5px">
          <Image src={FoxHeadSvg} h={'30px'} />
          <Box as="span" mx="10px">
            {truncateStringInTheMiddle(burrowRowState.scAddress)}
          </Box>
          <ClipboardCopy text={burrowRowState.scAddress} />
        </Flex>
        <Box mx="10px" mt="15px" textAlign="center">
          CTEZ / KIT
        </Box>
        <BurrowOperationInformation burrowOpeRowState={burrowOperation} />
        <Box mx="10px" mt="15px" py="5px" textAlign="center" bg="gray.200" borderRadius="10px">
          <Box fontSize="3xl" fontWeight="extrabold">
            100
          </Box>
          <Box fontSize="9px">BURROW BALANCE</Box>
        </Box>
        <Box mx="10px" mt="15px" textAlign="center">
          <Box as="span" mr="10px" fontWeight="extrabold">
            Digger
          </Box>
          {truncateStringInTheMiddle('testtesttesttesttest')}
        </Box>
        <Flex borderTop="1px solid" borderColor="gray.200" mt="15px">
          <VStack flex="1" py="10px">
            <Box fontSize="2xl" fontWeight="extrabold" p="0">
              1
            </Box>

            <Box as="span" fontSize="9px" fontWeight="normal" textAlign="center">
              OUTSTANDING CTEZ
            </Box>
          </VStack>
          <VStack
            py="10px"
            flex="1"
            borderLeft="1px solid"
            borderRight="1px solid"
            borderColor="gray.200"
          >
            <Box fontSize="2xl" fontWeight="extrabold">
              0,00
              <Box as="span" fontSize="12px" fontWeight="normal">
                %
              </Box>
            </Box>
            <Box as="span" fontSize="9px" fontWeight="normal" textAlign="center">
              CURRENT UTILIZATION
            </Box>
          </VStack>
          <VStack flex="1" py="10px">
            <IconButton
              isLoading={burrowOperation?.status === RequestStatus.pending}
              onClick={onToggle}
              aria-label="action"
              variant="ghost"
              icon={<DragHandleIcon size="xl" />}
            />
            <Box as="span" fontSize="9px" fontWeight="normal" textAlign="center">
              ACTION
            </Box>
          </VStack>
        </Flex>
      </Box>
      <SlideBox isOpen={isOpen} onClickOutSideMenu={onToggle}>
        <BurrowActionsBox burrowRowState={burrowRowState} onCloseActions={onToggle} />
      </SlideBox>
    </>
  )
}
