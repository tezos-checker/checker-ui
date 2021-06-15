import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import {
  burrowOpeWithdrawTezFormModel,
  inputWithdraw,
} from './component/burrow-ope-withdraw-tez.model'
import { WithdrawTezAmountField } from './component/withdraw-tez-amount-field'
import { useDispatchBurrowOpeWithdrawTez } from './useDispatchBurrowOpeWithdrawTez'

type Props = {
  burrow: BurrowRowState
  callBack: () => void
}

export const BurrowOpeWithdrawTezForm: FunctionComponent<Props> = ({
  burrow: { burrowId, scAddress },
  callBack,
}) => {
  const { withdrawTez } = useDispatchBurrowOpeWithdrawTez(burrowId, scAddress, callBack)
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(burrowOpeWithdrawTezFormModel)

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
      <WithdrawTezAmountField {...getInputProps(inputWithdraw)} />
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() => withdrawTez(getInputProps(inputWithdraw).value)}
        >
          Deposit
        </Button>
      </Box>
    </Box>
  )
}
