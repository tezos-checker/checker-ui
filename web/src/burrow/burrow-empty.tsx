import { Box, Button, Image } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import DeerSvg from '../assets/images/deer.svg'
import FoxCreateBorrowSvg from '../assets/images/fox-create-burrow.svg'

export const BurrowEmpty: FunctionComponent = () => (
  <Box margin={'auto'} fontSize="3xl" p="10" mt="20vh">
    <Box textAlign="center">
      <Box as="span">Oh deer </Box>
      <Image src={DeerSvg} h={'60px'} display="inline-block" />
      <Box as="span">,</Box>
    </Box>

    <Box textAlign="center">nothing here</Box>
    <Box textAlign="center">
      <Button mt="15">
        <Image src={FoxCreateBorrowSvg} height={'100%'} mr={'5'} />
        Create my first burrow
      </Button>
    </Box>
  </Box>
)
