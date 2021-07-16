import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { useGetWallet } from '@wallet'
import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import FoxCfmmSvg from '../../assets/images/fox-cfmm.svg'
import FoxTrackBurrowSvg from '../../assets/images/fox-track-burrow.svg'
import TezosSvg from '../../assets/images/tez.svg'
import { UserAvatarPopOver } from '../../header/user-avatar-popover'

export const PageHeader: React.FC = ({ children }) => {
  const { address } = useGetWallet()
  const history = useHistory()

  const UserHeader: FunctionComponent = () => (
    <Flex bg={'gray.700'} p={'10px'} justifyContent={'space-between'}>
      <Button onClick={() => history.push('/')} mx={'5'} variant="ghost">
        <Image src={TezosSvg} width={'40px'} height={'40px'} />
      </Button>
      <Box>
        <Button onClick={() => history.push('/cfmm')} mr={'5'}>
          <Image src={FoxCfmmSvg} height={'80%'} mr={'5'} />
          Cfmm
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

  return <UserHeader />
}
