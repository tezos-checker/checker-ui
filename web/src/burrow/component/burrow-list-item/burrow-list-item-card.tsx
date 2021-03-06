import { BurrowOpeName, BurrowOpeRowState, useGetBurrowOperation } from '@burrow-operation'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { BurrowRowState } from '../../state/burrow-state.type'
import { BurrowCard } from './burrow-card/burrow-card'
import { BurrowCreationStatusCard } from './burrow-creation-status-card/burrow-creation-status-card'

const isBurrowCreation = (burrowOperation?: BurrowOpeRowState) =>
  burrowOperation?.operationName === BurrowOpeName.create_burrow &&
  (burrowOperation?.status === RequestStatus.pending ||
    burrowOperation?.status === RequestStatus.error)

type Props = {
  burrow: BurrowRowState
}
export const BurrowListItemCard: FunctionComponent<Props> = ({ burrow }) => {
  const burrowOperation = useGetBurrowOperation(burrow.burrowId)
  return isBurrowCreation(burrowOperation) ? (
    <BurrowCreationStatusCard key={burrow.burrowId} {...(burrowOperation as BurrowOpeRowState)} />
  ) : (
    <BurrowCard key={burrow.burrowId} burrow={burrow} />
  )
}
