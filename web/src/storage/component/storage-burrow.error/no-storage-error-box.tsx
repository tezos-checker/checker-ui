import { RepeatIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import {
  EmptyBurrowStorage,
  EmptyCheckerStorage,
} from '../../state/create-storage/create-storage-action.util'
import { useStorageDispatcher } from '../../state/useStorageDisptacher.hook'

type Props = {
  burrowId: number
}

export const NoStorageErrorBox: FunctionComponent<Props> = ({ burrowId }) => {
  const { loadStorage } = useStorageDispatcher()

  return (
    <Box m="10px" bg="red.200" p="10px" borderRadius="5px">
      An error occured. No storage found. Try to load it...
      <IconButton
        onClick={() =>
          loadStorage({
            burrowId,
            status: RequestStatus.idle,
            burrowStorage: EmptyBurrowStorage,
            checkerStorage: EmptyCheckerStorage,
            errorMsg: '',
          })
        }
        aria-label="refresh"
        icon={<RepeatIcon />}
      />
    </Box>
  )
}
