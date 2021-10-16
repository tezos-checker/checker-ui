import { BurrowOpeRowState } from '@burrow-operation'
import { DragHandleIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton, Spinner, useDisclosure, VStack } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { useMetaViewMaxMintableKits } from '@meta-view-operation'
import { LoadingBox, SlideBox } from '@shared/ui'
import { isInvalidStorage, isInvalidStorageBurrow, truncateStringInTheMiddle } from '@shared/utils'
import { TzFormatMutezToTz } from '@wallet'
import { BigNumber } from 'bignumber.js'
import React, { FunctionComponent } from 'react'
import { StorageRow } from '../../../../../storage/state/storage-state.type'
import { BurrowRowState } from '../../../../state/burrow-state.type'
import { useBurrowDispatcher } from '../../../../state/useBurrowDispatcher.hook'
import { BurrowActionsBox } from '../../../burrow-actions-box/burrow-actions-box'

type Props = {
  burrow: BurrowRowState
  storage?: StorageRow
  burrowOperation?: BurrowOpeRowState
}

type PropsCardStorageColateral = {
  storage?: StorageRow
  burrowId: number
}

const CardStorageColateral: FunctionComponent<PropsCardStorageColateral> = ({
  storage,
  burrowId,
}) => {
  const { deleteBurrow } = useBurrowDispatcher()
  if (isInvalidStorageBurrow(storage)) {
    return (
      <>
        <Box m="15px" p="16px" bg="red.200" borderRadius="10px" textAlign="center" fontSize="2xl">
          Invalid burrow
        </Box>
        <Box fontSize="12px" textAlign="center">
          It seems that the burrow does not exist
        </Box>
        <Box fontSize="12px" textAlign="center">
          <Button variant="link" onClick={() => deleteBurrow(burrowId)}>
            remove burrow
          </Button>
        </Box>
      </>
    )
  }

  switch ((storage as StorageRow).status) {
    case RequestStatus.pending:
      return <Spinner />
    case RequestStatus.idle:
    case RequestStatus.success:
      return (
        <>
          <Box mx="10px" mt="15px" py="5px" textAlign="center" bg="gray.200" borderRadius="10px">
            <Box fontSize="3xl" fontWeight="extrabold">
              {`${TzFormatMutezToTz(storage?.burrowStorage.collateral || 0)} ꜩ`}
            </Box>
            <Box fontSize="9px">BURROW BALANCE</Box>
          </Box>
          <Box mx="10px" mt="15px" textAlign="center">
            <Box as="span" mr="10px" fontWeight="extrabold">
              Digger
            </Box>
            {truncateStringInTheMiddle(`${storage?.burrowStorage.address || ''}`)}
          </Box>
        </>
      )
    case RequestStatus.error:
    default:
      return <Box bg="red.200">Error while loading the burrow</Box>
  }
}

export const BurrowCardResume: FunctionComponent<Props> = ({
  burrow,
  storage,
  burrowOperation,
}) => {
  const { isOpen, onToggle } = useDisclosure()

  const [{ maxMintableKits, status: maxMintableKitsStatus }, reload] = useMetaViewMaxMintableKits(
    burrow.scAddress,
    burrow.burrowId,
  )

  const isLoading =
    storage?.status === RequestStatus.pending || burrowOperation?.status === RequestStatus.pending

  const outstandingKit = new BigNumber(storage?.burrowStorage.outstanding_kit || 0)

  return (
    <>
      <Box mx="10px" mt="15px" textAlign="center">
        CTEZ / KIT
      </Box>
      <Box flex="1" alignItems="center" mt="25px">
        <CardStorageColateral storage={storage} burrowId={burrow.burrowId} />
      </Box>
      <Flex borderTop="1px solid" borderColor="gray.200" mt="15px" alignItems="flex-end">
        <VStack flex="1" py="10px">
          <LoadingBox status={storage?.status || RequestStatus.idle}>
            <Box fontSize="2xl" fontWeight="extrabold" p="0">
              {TzFormatMutezToTz(storage?.burrowStorage.outstanding_kit || 0).toString()}
            </Box>
          </LoadingBox>

          <Box as="span" fontSize="9px" fontWeight="normal" textAlign="center">
            KIT
          </Box>
        </VStack>
        <VStack
          py="10px"
          flex="1"
          borderLeft="1px solid"
          borderRight="1px solid"
          borderColor="gray.200"
        >
          <LoadingBox status={maxMintableKitsStatus}>
            <Box fontSize="2xl" fontWeight="extrabold" p="2px">
              {(
                TzFormatMutezToTz(outstandingKit).toNumber() / maxMintableKits.toNumber()
              ).toPrecision(2)}
              <Box as="span" fontSize="12px" fontWeight="normal">
                %
              </Box>
            </Box>
          </LoadingBox>
          <Box as="span" fontSize="9px" fontWeight="normal" textAlign="center">
            CURRENT UTILIZATION
          </Box>
        </VStack>
        <VStack flex="1" py="10px">
          <IconButton
            isLoading={isLoading}
            onClick={onToggle}
            aria-label="action"
            variant="ghost"
            icon={<DragHandleIcon size="xl" />}
            disabled={isInvalidStorage(storage)}
          />
          <Box
            m="0"
            position="relative"
            as="span"
            fontSize="9px"
            fontWeight="normal"
            textAlign="center"
          >
            ACTION
          </Box>
        </VStack>
      </Flex>

      <SlideBox isOpen={isOpen} onClickOutSideMenu={onToggle}>
        <BurrowActionsBox burrow={burrow} onCloseActions={onToggle} />
      </SlideBox>
    </>
  )
}
