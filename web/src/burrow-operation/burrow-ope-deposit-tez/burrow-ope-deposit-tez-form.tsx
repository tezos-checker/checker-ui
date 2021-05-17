import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import {
  burrowOpeDepositTezFormModel,
  inputDeposit,
} from './component/burrow-ope-deposit-tez.model'
import { DepositTezAmountField } from './component/deposit-tez-amount-field'
import { useDispatchBurrowOpeDepositTez } from './useDispatchBurrowOpeDepositTez'

type Props = {
  burrow: BurrowRowState
  callBack: () => void
}

export const BurrowOpeDepositTezForm: FunctionComponent<Props> = ({
  burrow: { burrowId, scAddress },
  callBack,
}) => {
  const { depositTez } = useDispatchBurrowOpeDepositTez(burrowId, scAddress, callBack)
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(burrowOpeDepositTezFormModel)

  return (
    <Box
      onChange={handleFormChange}
      as="form"
      w="100%"
      border="1px solid"
      borderColor="gray.200"
      p="20px"
    >
      <Box fontSize="2xl">Deposit</Box>
      <DepositTezAmountField {...getInputProps(inputDeposit)} />
      <Box textAlign="right">
        <Button disabled={!isFormValid} mt="15px" onClick={() => depositTez(getInputProps(inputDeposit).value)}>
          Deposit
        </Button>
      </Box>
    </Box>
  )
}
