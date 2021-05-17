import { Box, Button, Spinner } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { useConnectWallet } from '../hooks/useConnectWallet'
import { useGetWallet } from '../state/useGetWalletSelector.hook'
import { WalletRowState } from '../state/wallet-state.type'

export const WalledLoader: FunctionComponent = () => {
  const wallet = useGetWallet()
  const connectWallet = useConnectWallet()

  const Wallet: FunctionComponent<{ walletData: WalletRowState }> = ({ walletData }) => {
    const { status, errMsg, address } = walletData
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
          onClick={connectWallet}
          disabled={wallet.status === RequestStatus.success}
          isLoading={wallet.status === RequestStatus.pending}
        >
          Connect
        </Button>
        <Wallet walletData={wallet} />
      </Box>
    </>
  )
}
