import { RequestStatus } from '@api'
import { Box, Button, Spinner } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { ScStorage } from './state/sc-storage.type'
import { dispatchLoadStorage } from './state/useDispatchLoadStorage'
import { useStorageData } from './state/useStorageData'

export const MyStorage: FunctionComponent = () => {
  const scStorage = useStorageData()

  const renderStorage = () => {
    const { status, content, errMsg } = scStorage as ScStorage
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
      <Button
        onClick={dispatchLoadStorage()}
        isLoading={scStorage !== null && scStorage.status === RequestStatus.pending}
      >
        Load storage
      </Button>
      {scStorage ? renderStorage() : null}
    </Box>
  )
}
