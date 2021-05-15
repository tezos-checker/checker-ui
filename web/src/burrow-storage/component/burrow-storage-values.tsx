import { Box, Spinner, Table, Td, Tr } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { BurrowStorageRow } from '../state/burrow-storage.type'
import { BurrowStorageErrorInfoBox } from './burrow-storage-error-info-box'

type Props = {
  burrowStorageRow?: BurrowStorageRow
}

export const BurrowStorageValues: FunctionComponent<Props> = ({ burrowStorageRow }) => {
  if (!burrowStorageRow) {
    return <Box>no storage</Box>
  }

  const {
    status,
    storage: { burrow },
  } = burrowStorageRow

  if (status === RequestStatus.pending) {
    return <Spinner />
  }

  return (
    <>
      <BurrowStorageErrorInfoBox burrowStorageRow={burrowStorageRow} />
      <Table>
        {Object.keys(burrow).map((x, i) => (
          <>
            <Tr key={x}>
              <Td bg="gray.100">{x}</Td>
            </Tr>
            <Tr key={`${x}${i}`}>
              <Td>{burrow[x] || ''}</Td>
            </Tr>
          </>
        ))}
      </Table>
    </>
  )
}
