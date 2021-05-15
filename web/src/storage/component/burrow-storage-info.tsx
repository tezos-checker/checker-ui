import { VStack } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BurrowStorageRow } from '../state/storage-state.type'
import { useStorageDispatcher } from '../state/useStorageDisptacher.hook'

export const BurrowStorageInfo: FunctionComponent<BurrowStorageRow> = (storage) => {
  const { loadStorage } = useStorageDispatcher()
  return (
    <VStack>
      <button onClick={loadStorage(storage)}>Load storage</button>
      <span>{storage.burrowId}</span>
      <span>{storage.status}</span>
      <span>{storage.errorMsg}</span>
    </VStack>
  )
}
