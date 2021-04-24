import { RequestStatus } from '@api'
import { Box, Button, Spinner } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { scStorageSelector } from './state/sc-storage.selector'
import { ScStorage } from './state/sc-storage.type'
import { dispatchLoadStorage } from './state/useDispatchLoadStorage'

export const MyStorage: FunctionComponent = () => {
  const scStorage = useSelector(scStorageSelector)

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
      <Button onClick={dispatchLoadStorage()}>Load storage</Button>
      {scStorage ? renderStorage() : null}
    </Box>
  )
}
