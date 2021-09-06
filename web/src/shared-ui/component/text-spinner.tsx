import { Box, BoxProps } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import React, { FunctionComponent } from 'react'

interface Props extends BoxProps {
  text: string
}

export const TextSpinner: FunctionComponent<Props> = (props) => {
  const { text, ...rest } = props
  return (
    <Box
      display="flex"
      mt="15px"
      w="100%"
      height="74px"
      borderRadius="md"
      alignItems="center"
      border="1px"
      bg="gray.200"
      {...rest}
    >
      <Spinner ml="15px" />
      <Box ml="15px" flex="1" fontSize="small">
        {text}
      </Box>
    </Box>
  )
}
