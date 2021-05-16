import { BurrowOpeRowState } from '@burrow-operation'
import { DragHandleIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, useDisclosure, VStack } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { SlideBox } from '@shared/ui'
import { truncateStringInTheMiddle, tzFormatter } from '@shared/utils'
import React, { FunctionComponent } from 'react'
import { StorageRow } from 'src/storage/state/storage-state.type'
import { BurrowRowState } from '../../../../state/burrow-state.type'
import { BurrowActionsBox } from '../../../burrow-actions-box/burrow-actions-box'

type Props = {
  burrowRowState: BurrowRowState
  storage?: StorageRow
  burrowOperation?: BurrowOpeRowState
}

export const BurrowCardResume: FunctionComponent<Props> = ({
  burrowRowState,
  storage,
  burrowOperation,
}) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Box mx="10px" mt="15px" textAlign="center">
        CTEZ / KIT
      </Box>
      <Box flex="1" alignItems="center" mt="25px">
        <Box mx="10px" mt="15px" py="5px" textAlign="center" bg="gray.200" borderRadius="10px">
          <Box fontSize="3xl" fontWeight="extrabold">
            {`${tzFormatter(storage?.storage.burrow.collateral || 0, 'tz')}`}
          </Box>
          <Box fontSize="9px">BURROW BALANCE</Box>
        </Box>
        <Box mx="10px" mt="15px" textAlign="center">
          <Box as="span" mr="10px" fontWeight="extrabold">
            Digger
          </Box>
          {truncateStringInTheMiddle(`${storage?.storage.burrow.address || ''}`)}
        </Box>
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

      <SlideBox isOpen={isOpen} onClickOutSideMenu={onToggle}>
        <BurrowActionsBox burrowRowState={burrowRowState} onCloseActions={onToggle} />
      </SlideBox>
    </>
  )
}
