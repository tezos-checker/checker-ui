import { Flex, HStack, Tag } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { useMetaViewTotalSupply } from '@meta-view-operation'
import { LoadingBox } from '@shared/ui'
import { useGetStorage, useStorageDispatcher } from '@storage'
import { rpcNetworkList, TzFormatMutezToTz } from '@wallet'
import BigNumber from 'bignumber.js'
import React, { useEffect } from 'react'
import { StorageRow } from 'src/storage/state/storage-state.type'
import {
  EmptyBurrowStorage,
  EmptyCheckerStorage,
} from '../../storage/state/create-storage/create-storage-action.util'

export const PageInfo: React.FC = () => {
  const { loadCheckerStorage } = useStorageDispatcher()
  const storage = useGetStorage(0) as StorageRow // HACK BURROW ID = 0 as only CHECKER global metrics

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

  const checkerAddress = rpcNetworkList.granadanet.checkers[0].address
  const [{ totalSupply, status: totalSupplyStatus }] = useMetaViewTotalSupply(checkerAddress)

  // new user does not have storage -
  // storage will be created after the useEffect
  if (!storage) {
    return <></>
  }

  const { status, checkerStorage } = storage

  // new_target = new_q * (new_index / kit_in_tez_now)
  return (
    <Flex bg={'blue.500'} p={['5px', '5px', '10px']} justifyContent={'space-between'}>
      <HStack spacing="4">
        <LoadingBox status={status}>
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
        </LoadingBox>
        <LoadingBox status={totalSupplyStatus}>
          <Tag size="md" key="md" borderRadius="full" variant="solid" colorScheme="orange">
            Pool Total Supply : {totalSupply.toNumber()}
          </Tag>
        </LoadingBox>
      </HStack>
    </Flex>
  )
}
