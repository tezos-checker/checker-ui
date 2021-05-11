import { Flex } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { ScWalletOperation } from '../../sc-operation/state/sc-ope-state.type'
import { BurrowRowState } from '../state/burrow-state.type'
import { useBurrowData } from '../state/useBurrowData'
import { BurrowListEmpty } from './burrow-list-empty'
import { BurrowItem } from './burrow-list-item/burrow-item'
import { BurrowItemPendingCreation } from './burrow-list-item/burrow-item-pending-creation'

export const BurrowList: FunctionComponent = () => {
  const burrows: BurrowRowState[] = useBurrowData()

  const isBurrowCreation = ({ operationName, status }: BurrowRowState) =>
    operationName === ScWalletOperation.create_burrow &&
    (status === RequestStatus.pending || status === RequestStatus.error)

  if (!burrows.length) {
    return <BurrowListEmpty />
  }

  return (
    <Flex>
      {burrows.map((burrow: BurrowRowState) =>
        isBurrowCreation(burrow) ? (
          <BurrowItemPendingCreation key={burrow.burrowId} {...burrow} />
        ) : (
          <BurrowItem key={burrow.burrowId} {...burrow} />
        ),
      )}
    </Flex>
  )
}
