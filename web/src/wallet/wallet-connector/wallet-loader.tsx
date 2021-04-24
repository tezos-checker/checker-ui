import { RequestStatus } from '@api'
import { Box, Button, Spinner } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { dispatchLoadWallet } from '../state/useDispatchLoadWallet'
import { walletData } from '../state/useWalletData'
import { WalletPayload } from '../state/wallet-state.type'

export const WalledLoader: FunctionComponent = () => {
  const wallet = walletData()

  const renderWallet = () => {
    const { status, address, errMsg } = wallet as WalletPayload
    switch (status) {
      case RequestStatus.pending:
        return <Spinner />
      case RequestStatus.error:
        return <Box>{errMsg}</Box>
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
        <Button
          onClick={dispatchLoadWallet()}
          disabled={wallet !== null && wallet.status === RequestStatus.success}
        >
          Connect
        </Button>
        {wallet ? renderWallet() : null}
      </Box>
    </>
  )
}
