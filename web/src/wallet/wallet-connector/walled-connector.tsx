/* eslint-disable */
import { Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useConnectedContext } from '../../_old_/state/connected.context'
import WalledConnected from './wallet-connected'
import { WalledLoader } from './wallet-loader'

export const WalletConnector: FunctionComponent = () => {
  const { t } = useTranslation()
  const { account } = useConnectedContext()
  return (
    <Box m={'10px'} textAlign={'center'}>
      <h1>{t('wallet')}</h1>
      {account ? <WalledConnected /> : <WalledLoader />}
    </Box>
  )
}
