import { Flex } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { useStorageDispatcher } from '@storage'
import React, { useEffect } from 'react'
import {
  EmptyBurrowStorage,
  EmptyCheckerStorage,
} from '../../storage/state/create-storage/create-storage-action.util'

export const PageInfo: React.FC = () => {
  const { loadCheckerStorage } = useStorageDispatcher()

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

  return <Flex bg={'blue.500'} p={['5px', '5px', '10px']} justifyContent={'space-between'}></Flex>
}
