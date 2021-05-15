import { RepeatIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { BurrowStorageRow } from '../state/burrow-storage.type'
import { useStorageDispatcher } from '../state/useStorageDisptacher.hook'

type Props = {
  burrowStorageRow?: BurrowStorageRow
}

export const BurrowStorageErrorInfoBox: FunctionComponent<Props> = ({ burrowStorageRow }) => {
  const { loadStorage } = useStorageDispatcher()

  if (!burrowStorageRow) {
    return <Box>no storage</Box>
  }

  const { status } = burrowStorageRow

  if (status !== RequestStatus.error) {
    return null
  }
  return (
    <Box>
      An error occured. Storage is not up to date. Try to reload to storage
      <IconButton
        onClick={loadStorage(burrowStorageRow)}
        aria-label="refresh"
        icon={<RepeatIcon />}
      />
    </Box>
  )
}
