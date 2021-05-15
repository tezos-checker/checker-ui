import { VStack } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BurrowStorageRow } from '../state/burrow-storage.type'
import { useBurrowStorageDispatcher } from '../state/useBurrowStorageDisptacher.hook'

export const BurrowStorageInfo: FunctionComponent<BurrowStorageRow> = (burrowStorage) => {
  const { loadStorage } = useBurrowStorageDispatcher()
  return (
    <VStack>
      <button onClick={loadStorage(burrowStorage)}>Load storage</button>
      <span>{burrowStorage.burrowId}</span>
      <span>{burrowStorage.status}</span>
      <span>{burrowStorage.errorMsg}</span>
    </VStack>
  )
}
