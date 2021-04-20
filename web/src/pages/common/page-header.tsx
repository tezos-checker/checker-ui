import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

export const PageHeader: React.FC = ({ children }) => (
  <Flex bg={'gray.700'} p={'5px'} justifyContent={'space-between'}>
    <Box padding={'10px'}>{children}</Box>
    <Image src="https://picsum.photos/50" alt="TBD" />
  </Flex>
)
