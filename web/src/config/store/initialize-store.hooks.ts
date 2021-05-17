// eslint-disable-next-line
// @ts-ignore
import { BurrowOpeRowState, useBurrowOpeDispatcher } from '@burrow-operation'
import { RequestStatus, RootState } from '@config'
import { Update } from '@reduxjs/toolkit'
import { useStorageDispatcher } from '@storage'
import { useGetWallet } from '@wallet'
import { useEffect } from 'react'
import { StorageRow } from '../../storage/state/storage-state.type'

export const useInitializeStore = (state: RootState) => {
  const { resetPendingBurrowOperation } = useBurrowOpeDispatcher()
  const { loadStorage } = useStorageDispatcher()
  const { address } = useGetWallet()

  /* if the user quit checker while an operetion is pending, the next connection to checker we reset the operation status */
  const resetBurrowOpeOnPending = () => {
    const burrowOperationIds = state.burrowOperation.ids
    const burrowOperationEntities = state.burrowOperation.entities as BurrowOpeRowState[]

    const burrowOperationToReset: Update<BurrowOpeRowState>[] = burrowOperationIds
      .filter((x) => burrowOperationEntities[x]?.status === RequestStatus.pending)
      .map((x) => ({
        id: x,
        changes: { status: RequestStatus.idle },
      }))

    resetPendingBurrowOperation(burrowOperationToReset)
  }

  const loadBurrowStorage = () => {
    const storageIds = state.storage.ids
    const storageEntities = state.storage.entities as StorageRow[]
    storageIds.forEach((x) => loadStorage(storageEntities[x]))
  }

  useEffect(() => {
    if (address && address !== '') {
      loadBurrowStorage()
      resetBurrowOpeOnPending()
    }
  }, [address])
}
