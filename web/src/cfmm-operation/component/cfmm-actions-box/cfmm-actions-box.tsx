import { Box } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

type Props = {
  onCloseActions: () => void
}

export const CfmmActionsBox: FunctionComponent<Props> = ({ onCloseActions }) => (
  <Box mt="5vh" p="20px">
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.200"
    ></Flex>
  </Box>
)
