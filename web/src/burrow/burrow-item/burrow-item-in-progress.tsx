import { Box, Image, Progress } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import FoxJumpingGif from '../../assets/images/fox-jumping.gif'

export const BurrowItemInProgress: FunctionComponent = () => (
  <Box border="1px solid" w="300px" m="10px" borderRadius="5px">
    <Image src={FoxJumpingGif} w={'100%'} />
    <Box textAlign="center" fontSize="2xl" fontWeight="semibold">
      We are creating your burrow...
    </Box>
    <Progress size="xs" isIndeterminate m="10px" />
    <Box textAlign="center" fontWeight="normal" fontSize="xs">
      Be patient. Usually takes less than 45 secondes
    </Box>
  </Box>
)

/* 

 <Flex
      alignItems="center"
      justifyContent="center"
      bg="gray.600"
      color="white"
      p="5px"
      h="52px"
    ></Flex>
    <Progress isIndeterminate />
    
*/
