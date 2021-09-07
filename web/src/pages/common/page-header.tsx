import { Box, Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import FoxHousePng from '../../assets/images/foxhouse.png'
import TezosSvg from '../../assets/images/tez.svg'
import { UserAvatarPopOver } from '../../header/user-avatar-popover'

export const PageHeader: React.FC = ({ children }) => {
  const history = useHistory()

  return (
    <Flex bg={'gray.700'} p={['5px', '5px', '10px']} justifyContent={'space-between'}>
      <Box>
        <Button variant={'ghost'} onClick={() => history.push('/')} mx={['2px', '2px', '10px']}>
          <Image
            src={TezosSvg}
            width={['20px', '20px', '40px']}
            height={['20px', '20px', '40px']}
          />
        </Button>
        {children}
      </Box>
      <Box>
        <Button variant={'ghost'} onClick={() => history.push('/')} mx={['2px', '2px', '10px']}>
          <Image
            src={FoxHousePng}
            width={['20px', '20px', '40px']}
            height={['20px', '20px', '40px']}
          />
        </Button>
      </Box>
      <UserAvatarPopOver />
    </Flex>
  )
}

/*
<Box display={['none', 'none', 'block']}>
        <Button onClick={() => history.push('/cfmm')} mr={'5'}>
          <Image src={FoxCfmmSvg} height={'80%'} mr={'5'} />
          Cfmm
        </Button>
*/
