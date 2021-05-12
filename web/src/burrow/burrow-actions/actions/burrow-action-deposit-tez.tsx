import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { noop } from 'rxjs'
import { useDispatchDepositTez } from '../../../sc-operation/sc-deposit-tez/useDispatchScOpeDepositTez'
import { BurrowRowState } from '../../state/burrow-state.type'

type Props = BurrowRowState
export const BurrowActionDepositTez: FunctionComponent<Props> = ({ burrowId }) => {
  const doDeposit = useDispatchDepositTez(burrowId, 1, noop)

  return (
    <Box>
      Deposit Component
      <Button onClick={doDeposit}>test Deposit</Button>
    </Box>
  )
}
