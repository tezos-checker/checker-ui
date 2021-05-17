import { Box, Flex, Spinner } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { useGetBurrowStorage } from '@storage'
import React, { FunctionComponent } from 'react'
import { StorageErrorInfoBox } from './storage-error-info-box'

type Props = {
  burrowId: number
}

export const StorageBurrowValues: FunctionComponent<Props> = ({ burrowId }) => {
  const storage = useGetBurrowStorage(burrowId)

  if (storage && storage.status === RequestStatus.pending) {
    return <Spinner />
  }

  const storageValue = Object.entries(storage?.storage?.burrow || [])

  return (
    <Box fontSize="12px" overflowY="auto" m="2px">
      <StorageErrorInfoBox burrowId={burrowId} storage={storage} storageToCheck="burrowStorage" />

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
