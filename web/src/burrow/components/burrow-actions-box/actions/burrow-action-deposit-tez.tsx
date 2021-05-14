import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useDispatchBurrowOpeDepositTez } from '../../../../burrow-operation/burrow-ope-deposit-tez/useDispatchBurrowOpeDepositTez'
import { BurrowRowState } from '../../../state/burrow-state.type'

type Props = BurrowRowState & { callBack: () => void }
export const BurrowActionDepositTez: FunctionComponent<Props> = ({
  burrowId,
  scAddress,
  callBack,
}) => {
  const { depositTez } = useDispatchBurrowOpeDepositTez(burrowId, scAddress, callBack)

  return (
    <Box>
      Deposit Component
      <Button onClick={depositTez(1)}>test Deposit</Button>
    </Box>
  )
}
