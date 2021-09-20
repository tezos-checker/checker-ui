import { Flex } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { useGetStorage, useStorageDispatcher } from '@storage'
import React, { useEffect } from 'react'
import {
  EmptyBurrowStorage,
  EmptyCheckerStorage,
} from '../../storage/state/create-storage/create-storage-action.util'

export const PageInfo: React.FC = () => {
  const { loadCheckerStorage } = useStorageDispatcher()
  const storage = useGetStorage(0) // HACK BURROW ID = 0 as only CHECKER global metrics

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

  // new_target = new_q * (new_index / kit_in_tez_now)

  return (
    <Flex bg={'blue.500'} p={['5px', '5px', '10px']} justifyContent={'space-between'}>
      Last Update : {storage?.checkerStorage.last_touched}
      Oracle Price : {storage?.checkerStorage.index}
      Target Price : 1 Drift : {storage?.checkerStorage.drift}
    </Flex>
  )
}
