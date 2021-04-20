import { Box, CloseButton, Flex, IconButton } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { truncateStringInTheMiddle } from '../../_old_/utils/tool'
import { useConnectedContext } from '../../_old_/state/connected.context'

const WalledConnected: FunctionComponent = () => {
  const { account, clearCurrentAccount } = useConnectedContext()

  if (!account) {
    return null
  }

  const handleClick = () => {
    window.location.reload(false)
    clearCurrentAccount()
  }

  return (
    <Flex
      justifyContent={'space-between'}
      p={'10px'}
      bg={'green.100'}
      border={'1px solid'}
      borderColor={'green.200'}
    >
      <Box as={'span'}>{truncateStringInTheMiddle(account.pkh, 6, 4)}&nbsp;|</Box>
      <IconButton onClick={handleClick} aria-label={'disconnect'} icon={<CloseButton />} />
    </Flex>
  )
}

export default WalledConnected
