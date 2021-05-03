import { Login } from '@auth'
import { Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

export const LoginPage: FunctionComponent = () => (
  <Box border={'1px solid'} margin={'auto'} borderRadius={'10px'} padding={'20px'}>
    <Login />
  </Box>
)
