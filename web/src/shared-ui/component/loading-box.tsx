import { Box } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'

type Props = {
  status: RequestStatus
}

export const LoadingBox: FunctionComponent<Props> = ({ status, children }) => {
  switch (status) {
    case RequestStatus.pending:
      return <Spinner />
    case RequestStatus.error:
      return <Box>Something went wrong</Box>
    default:
      return <>{children}</>
  }
}
