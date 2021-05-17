import { Box, Flex, Spinner } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { getStorage } from '@storage'
import React, { FunctionComponent } from 'react'
import { StorageErrorInfoBox } from './storage-error-info-box'

type Props = {
  burrowId: number
}

export const StorageParametersValues: FunctionComponent<Props> = ({ burrowId }) => {
  const storage = getStorage(burrowId)

  if (storage && storage.status === RequestStatus.pending) {
    return <Spinner />
  }

  const storageValues = Object.entries(storage?.storage?.parameters || [])

  return (
    <Box fontSize="12px" overflowY="auto" m="2px">
      <StorageErrorInfoBox burrowId={burrowId} storage={storage} storageToCheck="checkerStorage" />

      {storageValues.map((x, i) => (
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
