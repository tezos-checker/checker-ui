import { RepeatIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent, useEffect } from 'react'
import { getEmptyStorage } from '../state/create-storage/create-storage-action.util'
import { StorageRow } from '../state/storage-state.type'
import { useStorageDispatcher } from '../state/useStorageDisptacher.hook'

type Props = {
  burrowId: number
  storageRow?: StorageRow
}

export const StorageErrorInfoBox: FunctionComponent<Props> = ({ burrowId, storageRow }) => {
  const { loadStorage } = useStorageDispatcher()

  useEffect(() => {
    if (!storageRow) {
      loadStorage({
        burrowId,
        status: RequestStatus.idle,
        storage: getEmptyStorage(),
        errorMsg: '',
      })
    }
  }, [])

  if (!storageRow) {
    return <Box>no storage </Box>
  }

  const { status } = storageRow

  if (status !== RequestStatus.error) {
    return null
  }
  return (
    <Box>
      An error occured. Storage is not up to date. Reload storage
      <IconButton
        onClick={() => loadStorage(storageRow)}
        aria-label="refresh"
        icon={<RepeatIcon />}
      />
    </Box>
  )
}
