import { RequestStatus } from '@api'
import { Box, Button, Spinner } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { ScStorageRowState } from './state/sc-storage.type'
import { useDispatchLoadStorage } from './state/useDispatchLoadStorage'
import { useStorageData } from './state/useStorageData'

export const MyStorage: FunctionComponent = () => {
  const storage = useStorageData()
  const loadStorage = useDispatchLoadStorage()

  const Storage: FunctionComponent<{ storageData: ScStorageRowState }> = ({ storageData }) => {
    const { errMsg, status, content } = storage
    switch (status) {
      case RequestStatus.pending:
        return <Spinner />
      case RequestStatus.error:
        return <Box> {errMsg}</Box>
      case RequestStatus.success:
        return <Box> {`Storage value is ${content}`}</Box>
      default:
        return null
    }
  }

  return (
    <Box m={'25px'}>
      <h2>Storage</h2>
      <Button onClick={loadStorage} isLoading={storage.status === RequestStatus.pending}>
        Load storage
      </Button>
      <Storage storageData={storage} />
    </Box>
  )
}
