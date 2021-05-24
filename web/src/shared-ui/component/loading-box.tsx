import { Spinner } from '@chakra-ui/spinner'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'

type Props = {
  status: RequestStatus
}

export const LoadingBox: FunctionComponent<Props> = ({ status, children }) =>
  status === RequestStatus.pending ? <Spinner /> : <>{children}</>
