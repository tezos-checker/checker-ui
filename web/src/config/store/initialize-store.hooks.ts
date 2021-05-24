// eslint-disable-next-line
// @ts-ignore
import { BurrowRowState } from '@burrow'
import { BurrowOpeRowState, useBurrowOpeDispatcher } from '@burrow-operation'
import { RequestStatus, RootState } from '@config'
import { Update } from '@reduxjs/toolkit'
import { useStorageDispatcher } from '@storage'
import { useGetWallet } from '@wallet'
import { useEffect } from 'react'
import { useGetAllBurrows } from '../../burrow/state/useGetAllBurrowsSelector.hook'
import { StorageRow } from '../../storage/state/storage-state.type'

export const useInitializeStore = (state: RootState) => {
  const { resetPendingBurrowOperation } = useBurrowOpeDispatcher()
  const { loadStorage } = useStorageDispatcher()
  const { address } = useGetWallet()
  const burrows = useGetAllBurrows()

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

  // we only have to load the storages for the current account
  const loadBurrowStorage = () => {
    const storageIds = burrows
      .filter((x: BurrowRowState) => x.walletAddress === address)
      .map((x: BurrowRowState) => x.burrowId)

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
