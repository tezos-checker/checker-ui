import { Box, CloseButton, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import { useConnectedContext } from '../../../state/connected.context'
import { truncateStringInTheMiddle } from '../../../utils/tool'

const WalledConnected: React.FC = () => {
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
