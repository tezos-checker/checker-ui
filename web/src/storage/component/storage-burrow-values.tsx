import { Box, Flex, Spinner } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { getStorage } from '@storage'
import React, { FunctionComponent } from 'react'
import { StorageRow } from '../state/storage-state.type'
import { StorageErrorInfoBox } from './storage-error-info-box'

type Props = {
  burrowId: number
  storageRow?: StorageRow
}

export const StorageBurrowValues: FunctionComponent<Props> = ({ burrowId }) => {
  const storageRow = getStorage(burrowId)

  if (!storageRow) {
    return <StorageErrorInfoBox burrowId={burrowId} storageRow={storageRow} />
  }

  const {
    status,
    storage: { burrow },
  } = storageRow

  if (status === RequestStatus.pending) {
    return <Spinner />
  }
  const storageValue = Object.entries(burrow)

  return (
    <Box fontSize="12px">
      <StorageErrorInfoBox burrowId={burrowId} storageRow={storageRow} />

      {storageValue.map((x, i) => (
        <Flex
          key={x[0]}
          bg={i % 2 === 0 ? 'gray.200' : 'white'}
          px="2px"
          py="5px"
          justify="space-between"
        >
          <Box as="span" fontWeight="600">
            {x[0]}
          </Box>
          <Box as="span"> {x[1] ? x[1].toString() : ''}</Box>
        </Flex>
      ))}
    </Box>
  )
}
