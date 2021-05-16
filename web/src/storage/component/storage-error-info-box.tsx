import { RepeatIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { isInvalidStorageBurrow, isInvalidStorageParameters } from '@shared/utils'
import React, { FunctionComponent } from 'react'
import { StorageRow } from '../state/storage-state.type'
import { useStorageDispatcher } from '../state/useStorageDisptacher.hook'
import { InvalidBurrowStorageErrorBox } from './storage-burrow.error/invalid-burrow-storage-error-box'
import { InvalidCheckerStorageErrorBox } from './storage-burrow.error/invalid-checker-storage-error-box'
import { NoStorageErrorBox } from './storage-burrow.error/no-storage-error-box'

type Props = {
  burrowId: number
  storage?: StorageRow
  storageToCheck: 'burrowStorage' | 'checkerStorage'
}

export const StorageErrorInfoBox: FunctionComponent<Props> = ({
  burrowId,
  storage,
  storageToCheck,
}) => {
  const { loadStorage } = useStorageDispatcher()

  if (!storage) {
    return <NoStorageErrorBox burrowId={burrowId} />
  }

  if (storageToCheck === 'burrowStorage' && isInvalidStorageBurrow(storage)) {
    return <InvalidBurrowStorageErrorBox storage={storage} />
  }

  if (storageToCheck === 'checkerStorage' && isInvalidStorageParameters(storage)) {
    return <InvalidCheckerStorageErrorBox storage={storage} />
  }

  const { status } = storage

  return status === RequestStatus.error ? (
    <Box>
      An error occured. Storage is not up to date. Reload storage
      <IconButton onClick={() => loadStorage(storage)} aria-label="refresh" icon={<RepeatIcon />} />
    </Box>
  ) : null
}
