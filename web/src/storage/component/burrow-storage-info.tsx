import { VStack } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BurrowStorageRow } from '../state/burrow-storage.type'
import { useStorageDispatcher } from '../state/useStorageDisptacher.hook'

export const BurrowStorageInfo: FunctionComponent<BurrowStorageRow> = (burrowStorage) => {
  const { loadStorage } = useStorageDispatcher()
  return (
    <VStack>
      <button onClick={loadStorage(burrowStorage)}>Load storage</button>
      <span>{burrowStorage.burrowId}</span>
      <span>{burrowStorage.status}</span>
      <span>{burrowStorage.errorMsg}</span>
    </VStack>
  )
}
