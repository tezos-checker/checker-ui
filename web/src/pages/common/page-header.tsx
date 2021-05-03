import { Box, Flex } from '@chakra-ui/react'
import { useWalletData } from '@wallet'
import React, { FunctionComponent } from 'react'

export const PageHeader: React.FC = ({ children }) => {
  const { address } = useWalletData()
  const UserHeader: FunctionComponent = () => (
    <Flex bg={'gray.700'} p={'10px'} justifyContent={'space-between'}>
      <img src="https://tezos.com/img/tez.svg" width={'40px'} height={'40px'} />
      <Box>{children}</Box>
    </Flex>
  )

  return address ? <UserHeader /> : null
}
