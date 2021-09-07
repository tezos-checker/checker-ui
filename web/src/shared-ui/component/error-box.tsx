import { WarningIcon } from '@chakra-ui/icons'
import { Box, BoxProps, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

interface Props extends BoxProps {
  errorText?: string
  onRetry?: () => void
}

export const ErrorBox: FunctionComponent<Props> = (props) => {
  const { errorText = 'Something went wrong', onRetry, ...rest } = props
  return (
    <Box
      mt="15px"
      {...rest}
      display="flex"
      flexDirection="column"
      bg="red.100"
      border="1px"
      borderColor="red.400"
      p="10px"
      borderRadius="8px"
      fontSize="small"
    >
      <Box as="span">
        <WarningIcon color="red.400" mr="10px" />
        Oups...
      </Box>
      <Box mt="5px" display="flex" justifyContent="space-between" alignItems="center">
        <Box as="span">{errorText}</Box>
        {onRetry ? (
          <Button size="sm" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}
