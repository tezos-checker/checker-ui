/* eslint-disable */
import { Box } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useConnectedContext } from '../../../state/connected.context'
import WalledConnected from './wallet-connected'
import WalledUploader from './wallet-uploader'

export const WalletV2 = () => {
  const { t } = useTranslation()
  const { account } = useConnectedContext()
  return (
    <Box m={'10px'} textAlign={'center'}>
      <h1>{t('wallet')}</h1>
      {account ? <WalledConnected /> : <WalledUploader />}
    </Box>
  )
}
