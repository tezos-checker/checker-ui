import { RequestStatus } from '@api'
import { Box, Button, Spinner } from '@chakra-ui/react'
import { useAppDispatch } from '@config'
import { useAppToast } from '@shared/ui'
import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { walletActions } from '../state/wallet.slice'
import { walletSelector } from '../state/wallet/wallet-selector'

export const WalledLoader: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { status, address, errMsg } = useSelector(walletSelector)
  const { successToast, errorToast } = useAppToast()

  useEffect(() => {
    if (status === RequestStatus.error) {
      errorToast('Wallet connection', errMsg)
    }
    if (status === RequestStatus.success) {
      successToast('Wallet', 'Connection success')
    }
  }, [status])

  const renderWallet = () => {
    switch (status) {
      case RequestStatus.loading:
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
