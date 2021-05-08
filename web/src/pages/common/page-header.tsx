import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { useWalletData } from '@wallet'
import React, { FunctionComponent } from 'react'
import FoxCreateBorrowSvg from '../../assets/images/fox-create-burrow.svg'
import FoxTrackBurrowSvg from '../../assets/images/fox-track-burrow.svg'
import TezosSvg from '../../assets/images/tez.svg'
import { UserAvatarPopOver } from '../../header/user-avatar-popover'

export const PageHeader: React.FC = ({ children }) => {
  const { address } = useWalletData()
  const UserHeader: FunctionComponent = () => (
    <Flex bg={'gray.700'} p={'10px'} justifyContent={'space-between'}>
      <Image src={TezosSvg} width={'40px'} height={'40px'} />
      <Box>
        <Button>
          <Image src={FoxCreateBorrowSvg} height={'100%'} mr={'5'} />
          Create a burrow
        </Button>
        <Button mx={'5'}>
          <Image src={FoxTrackBurrowSvg} height={'100%'} mr={'5'} />
          Track a burrow
        </Button>
        <UserAvatarPopOver />
        {children}
      </Box>
    </Flex>
  )

  return address ? <UserHeader /> : null
}
