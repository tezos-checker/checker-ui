import { RequestStatus } from '@api'
import { Box, Button, Spinner } from '@chakra-ui/react'
import { useAppDispatch } from '@config'
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { walletActions } from '../state/wallet.slice'
import { walletSelector } from '../state/wallet/wallet-selector'

export const WalledLoader: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { status, address } = useSelector(walletSelector)

  const renderWallet = () => {
    switch (status) {
      case RequestStatus.pending:
        return <Spinner />
      case RequestStatus.error:
      case RequestStatus.idle:
        return (
          <>
            <Box> Your are not connected </Box>
            <Button onClick={() => dispatch(walletActions.connect())}>Connect</Button>
          </>
        )
      case RequestStatus.success:
        return <Box> {`Your address is ${address}`}</Box>
      default:
        return null
    }
  }

  return (
    <>
      <Box>
        <h2>Your wallet</h2>
        {renderWallet()}
      </Box>
    </>
  )
}
