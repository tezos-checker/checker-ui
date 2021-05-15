import { Box, Spinner, Table, Td, Tr } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { StorageRow } from '../state/storage-state.type'
import { StorageErrorInfoBox } from './storage-error-info-box'

type Props = {
  storageRow?: StorageRow
}

export const StorageBurrowValues: FunctionComponent<Props> = ({ storageRow }) => {
  if (!storageRow) {
    return <Box>no storage</Box>
  }

  const {
    status,
    storage: { burrow },
  } = storageRow

  if (status === RequestStatus.pending) {
    return <Spinner />
  }

  return (
    <>
      <StorageErrorInfoBox storageRow={storageRow} />
      <Table>
        {Object.keys(burrow).map((x, i) => (
          <>
            <Tr key={x}>
              <Td bg="gray.100">{x}</Td>
            </Tr>
            <Tr key={`${x}${i}`}>
              <Td>{(burrow as any)[x] || ''}</Td>
            </Tr>
          </>
        ))}
      </Table>
    </>
  )
}
