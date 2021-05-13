import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useDispatchDepositTez } from '../../../sc-operation/sc-deposit-tez/useDispatchScOpeDepositTez'
import { BurrowRowState } from '../../state/burrow-state.type'

type Props = BurrowRowState & { callBack: () => void }
export const BurrowActionDepositTez: FunctionComponent<Props> = ({
  burrowId,
  scAddress,
  callBack,
}) => {
  const { depositTez } = useDispatchDepositTez(burrowId, scAddress, callBack)

  return (
    <Box>
      Deposit Component
      <Button onClick={depositTez(1)}>test Deposit</Button>
    </Box>
  )
}
