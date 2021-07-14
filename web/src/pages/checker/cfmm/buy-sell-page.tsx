import { Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

export const BuySellPage: FunctionComponent = () => {
  // eslint-disable-next-line
  // @ts-ignore
  const { address } = useParams()

  return (
    <Box display="flex" flexDirection="column" height="85vh">
      Buy sell page {address}
    </Box>
  )
}
