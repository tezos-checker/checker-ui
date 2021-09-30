import { Flex, HStack, Tag } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { LoadingBox } from '@shared/ui'
import { useGetStorage, useStorageDispatcher } from '@storage'
import { Checker, TzFormatMutezToTz } from '@wallet'
import BigNumber from 'bignumber.js'
import React, { useEffect } from 'react'
import { StorageRow } from 'src/storage/state/storage-state.type'
import {
  EmptyBurrowStorage,
  EmptyCheckerStorage,
} from '../../storage/state/create-storage/create-storage-action.util'

type Props = {
  checker: Checker
}

export const PageInfo: React.FC = () => {
  const { loadCheckerStorage } = useStorageDispatcher()
  const { status, checkerStorage } = useGetStorage(0) as StorageRow // HACK BURROW ID = 0 as only CHECKER global metrics

  //  refactoring o, burrow part later as useless
  useEffect(() => {
    loadCheckerStorage({
      burrowId: 0,
      status: RequestStatus.idle,
      burrowStorage: EmptyBurrowStorage,
      checkerStorage: EmptyCheckerStorage,
      errorMsg: '',
    })
  }, [])

  // const data = useMetaViewTotalSupply(checker.address)

  // new_target = new_q * (new_index / kit_in_tez_now)

  return (
    <Flex bg={'blue.500'} p={['5px', '5px', '10px']} justifyContent={'space-between'}>
      <LoadingBox status={status}>
        <HStack spacing="4">
          <Tag size="md" key="md" borderRadius="full" variant="solid" colorScheme="orange">
            Update : {new Date(checkerStorage?.last_touched).toLocaleString('en')}
          </Tag>
          <Tag size="md" key="md" borderRadius="full" variant="solid" colorScheme="orange">
            Oracle Price : {TzFormatMutezToTz(checkerStorage?.index || 0).toNumber()}
          </Tag>
          <Tag size="md" key="md" borderRadius="full" variant="solid" colorScheme="orange">
            Target Price : 1
          </Tag>
          <Tag size="md" key="md" borderRadius="full" variant="solid" colorScheme="orange">
            Drift : {new BigNumber(checkerStorage?.drift).toNumber()}
          </Tag>
        </HStack>
      </LoadingBox>
    </Flex>
  )
}
