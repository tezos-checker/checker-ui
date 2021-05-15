import { RepeatIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { BurrowStorageRow } from '../state/storage-state.type'
import { useStorageDispatcher } from '../state/useStorageDisptacher.hook'

type Props = {
  storageRow?: BurrowStorageRow
}

export const StorageErrorInfoBox: FunctionComponent<Props> = ({ storageRow }) => {
  const { loadStorage } = useStorageDispatcher()

  if (!storageRow) {
    return <Box>no storage</Box>
  }

  const { status } = storageRow

  if (status !== RequestStatus.error) {
    return null
  }
  return (
    <Box>
      An error occured. Storage is not up to date. Try to reload to storage
      <IconButton onClick={loadStorage(storageRow)} aria-label="refresh" icon={<RepeatIcon />} />
    </Box>
  )
}
