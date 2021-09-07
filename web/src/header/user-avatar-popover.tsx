import { LoginButton } from '@auth'
import {
  Button,
  ButtonGroup,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { ClipboardCopy } from '@shared/ui'
import { truncateStringInTheMiddle } from '@shared/utils'
import { useDisconnectWallet, useGetWallet } from '@wallet'
import React, { FunctionComponent } from 'react'
import FoxSvg from '../assets/images/fox.svg'

export const UserAvatarPopOver: FunctionComponent = () => {
  const { address } = useGetWallet()
  const disconnectWallet = useDisconnectWallet()

  const renderUserInformation = () => (
    <>
      <PopoverHeader pt={4} fontWeight="bold" border="0">
        Your account
      </PopoverHeader>
      <PopoverBody>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          {truncateStringInTheMiddle(address || '')}
          <ClipboardCopy text={address || ''} />
        </Flex>
      </PopoverBody>
      <PopoverFooter
        borderTop="1px solid"
        borderColor="white"
        d="flex"
        py={5}
        mt={5}
        flexDirection="row-reverse"
      >
        <ButtonGroup size="sm">
          <Button onClick={disconnectWallet} colorScheme="blue">
            Disconnect
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </>
  )

  const renderLogin = () => (
    <>
      <PopoverHeader pt={4} fontWeight="bold" border="0">
        Login
      </PopoverHeader>
      <PopoverBody display="flex" justifyContent="flex-end" bgColor="white">
        <LoginButton />
      </PopoverBody>
    </>
  )
  return (
    <Popover placement="bottom" closeOnBlur={true}>
      <PopoverTrigger>
        <Button variant="ghost">
          <Image height={'100%'} w={'auto'} src={FoxSvg} />
        </Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800" mt={1} mr={3}>
        {!address ? renderLogin() : renderUserInformation()}
      </PopoverContent>
    </Popover>
  )
}
