import { CheckerCfmmActions } from '@checker'
import { mockedCheckers } from '@config'
import { PageNotFound } from '@shared/ui'
import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

export const CheckerCfmmActionsPage: FunctionComponent = () => {
  // eslint-disable-next-line
  // @ts-ignore
  const { address } = useParams()

  const checkerSelected = mockedCheckers.find((checker) => checker.address === address)

  return checkerSelected ? <CheckerCfmmActions checker={checkerSelected} /> : <PageNotFound />
}
