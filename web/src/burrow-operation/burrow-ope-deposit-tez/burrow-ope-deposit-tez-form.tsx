import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import { useDispatchBurrowOpeDepositTez } from './useDispatchBurrowOpeDepositTez'

type Props = {
  burrowRowState: BurrowRowState
  callBack: () => void
}

export const BurrowOpeDepositTezForm: FunctionComponent<Props> = ({
  burrowRowState: { burrowId, scAddress },
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
