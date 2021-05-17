import { RepeatIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { StorageRow } from '../../state/storage-state.type'
import { useStorageDispatcher } from '../../state/useStorageDisptacher.hook'

type Props = {
  storage: StorageRow
}

export const LoadStorageRequestFaildBox: FunctionComponent<Props> = ({ storage }) => {
  const { loadStorage } = useStorageDispatcher()
  return (
    <Box m="10px" bg="red.200" p="10px" borderRadius="5px">
      An error occured. Storage is not up to date. Reload storage
      <IconButton onClick={() => loadStorage(storage)} aria-label="refresh" icon={<RepeatIcon />} />
    </Box>
  )
}
