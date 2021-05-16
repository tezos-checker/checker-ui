import { Box, Flex, Spinner } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { StorageRow } from '../state/storage-state.type'
import { StorageErrorInfoBox } from './storage-error-info-box'

type Props = {
  burrowId: number
  storageRow?: StorageRow
}

export const StorageParametersValues: FunctionComponent<Props> = ({ burrowId, storageRow }) => {
  if (!storageRow) {
    return <StorageErrorInfoBox burrowId={burrowId} storageRow={storageRow} />
  }

  const {
    status,
    storage: { parameters },
  } = storageRow

  if (status === RequestStatus.pending) {
    return <Spinner />
  }
  const storageValue = Object.entries(parameters)

  return (
    <Box fontSize="12px" overflowY="auto">
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
