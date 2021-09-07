import { Spinner } from '@chakra-ui/spinner'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { ErrorBox } from '..'

type Props = {
  status: RequestStatus
  loader?: React.ReactElement
  onRetry?: () => void
  errorText?: string
}

export const LoadingBox: FunctionComponent<Props> = ({
  status,
  loader = <Spinner />,
  onRetry,
  errorText,
  children,
}) => {
  switch (status) {
    case RequestStatus.pending:
      return <>{loader}</>
    case RequestStatus.error:
      return <ErrorBox errorText={errorText} onRetry={onRetry} />
    default:
      return <>{children}</>
  }
}
