import { CheckerCfmmBuySell } from '@checker'
import { mockedCheckers } from '@config'
import { PageNotFound } from '@shared/ui'
import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

export const CheckerCfmmBuySellPage: FunctionComponent = () => {
  // eslint-disable-next-line
  // @ts-ignore
  const { address } = useParams()

  const checkerSelected = mockedCheckers.find((checker) => checker.address === address)

  return checkerSelected ? <CheckerCfmmBuySell checker={checkerSelected} /> : <PageNotFound />
}
