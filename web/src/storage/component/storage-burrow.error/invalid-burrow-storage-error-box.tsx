import { RepeatIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { StorageRow } from '../../state/storage-state.type'
import { useStorageDispatcher } from '../../state/useStorageDisptacher.hook'

type Props = {
  storage: StorageRow
}

export const InvalidBurrowStorageErrorBox: FunctionComponent<Props> = ({ storage }) => {
  const { loadStorage } = useStorageDispatcher()
  return (
    <Box m="10px" bg="red.200" p="10px" borderRadius="5px">
      The Burrow does not contain his associated storage... Try to reload it
      <IconButton onClick={() => loadStorage(storage)} aria-label="refresh" icon={<RepeatIcon />} />
    </Box>
  )
}
