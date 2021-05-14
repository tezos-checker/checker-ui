import { getBurrowOperation } from '@burrow-operation'
import { Flex } from '@chakra-ui/react'
import { RequestStatus, useAppDispatch } from '@config'
import React, { FunctionComponent } from 'react'
import {
  BurrowOpeEnum,
  BurrowOpeRowState,
} from '../../burrow-operation/state/burrow-ope-state.type'
import { BurrowRowState } from '../state/burrow-state.type'
import { useBurrowData } from '../state/useBurrowData'
import { BurrowListEmpty } from './burrow-list-empty'
import { BurrowCreationInfoBox } from './burrow-list-item/burrow-creation-info-box'
import { BurrowItem } from './burrow-list-item/burrow-item'

export const BurrowList: FunctionComponent = () => {
  const burrows: BurrowRowState[] = useBurrowData()
  const dispatch = useAppDispatch()

  const isBurrowCreation = (burrowOperation?: BurrowOpeRowState) =>
    burrowOperation?.operationName === BurrowOpeEnum.create_burrow &&
    (burrowOperation?.status === RequestStatus.pending ||
      burrowOperation?.status === RequestStatus.error)

  if (!burrows.length) {
    return <BurrowListEmpty />
  }

  return (
    <Flex>
      {burrows.map((burrow: BurrowRowState) => {
        const burrowOperation = getBurrowOperation(burrow.burrowId)

        return isBurrowCreation(burrowOperation) ? (
          <BurrowCreationInfoBox
            key={burrow.burrowId}
            {...(burrowOperation as BurrowOpeRowState)}
          />
        ) : (
          <BurrowItem key={burrow.burrowId} {...burrow} />
        )
      })}
    </Flex>
  )
}
