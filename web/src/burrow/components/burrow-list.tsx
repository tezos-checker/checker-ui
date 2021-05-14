import { Button, Flex } from '@chakra-ui/react'
import { RequestStatus, useAppDispatch } from '@config'
import React, { FunctionComponent } from 'react'
import { ScWalletOperation } from '../../sc-operation/state/sc-ope-state.type'
import { BurrowRowState } from '../state/burrow-state.type'
import { burrowActions } from '../state/burrow.slice'
import { useBurrowData } from '../state/useBurrowData'
import { BurrowListEmpty } from './burrow-list-empty'
import { BurrowItem } from './burrow-list-item/burrow-item'
import { BurrowItemPendingCreation } from './burrow-list-item/burrow-item-pending-creation'

export const BurrowList: FunctionComponent = () => {
  const burrows: BurrowRowState[] = useBurrowData()
  const dispatch = useAppDispatch()

  const isBurrowCreation = ({ currentOperation: { operationName, status } }: BurrowRowState) =>
    operationName === ScWalletOperation.create_burrow &&
    (status === RequestStatus.pending || status === RequestStatus.error)

  if (!burrows.length) {
    return <BurrowListEmpty />
  }

  return (
    <>
      <Button
        onClick={() =>
          dispatch(
            burrowActions.loadStorage({
              burrowId: 51,
              scAddress: 'KT19BUeLeqaX5qqnq3XajCpXruyJ77aUPs74',
            }),
          )
        }
      >
        TEST
      </Button>
      <Flex>
        {burrows.map((burrow: BurrowRowState) =>
          isBurrowCreation(burrow) ? (
            <BurrowItemPendingCreation key={burrow.burrowId} {...burrow} />
          ) : (
            <BurrowItem key={burrow.burrowId} {...burrow} />
          ),
        )}
      </Flex>
    </>
  )
}
