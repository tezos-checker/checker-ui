import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import {
  burrowOpeWithdrawCollateralFormModel,
  inputWithdraw,
} from './burrow-ope-withdraw-collateral.model'
import { WithdrawCollateralAmountField } from './component/withdraw-collateral-amount-field'
import { useDispatchBurrowOpeWithdrawCollateral } from './useDispatchBurrowOpeWithdrawCollateral'

type Props = {
  burrow: BurrowRowState
  callBack: () => void
}

export const BurrowOpeWithdrawCollateralForm: FunctionComponent<Props> = ({
  burrow: { burrowId, scAddress },
  callBack,
}) => {
  const { WithdrawCollateral } = useDispatchBurrowOpeWithdrawCollateral(
    burrowId,
    scAddress,
    callBack,
  )
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(burrowOpeWithdrawCollateralFormModel)

  return (
    <Box
      onChange={handleFormChange}
      as="form"
      w="100%"
      border="1px solid"
      borderColor="gray.200"
      p="20px"
    >
      <Box fontSize="2xl">Withdraw</Box>
      <WithdrawCollateralAmountField {...getInputProps(inputWithdraw)} />
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() => WithdrawCollateral(getInputProps(inputWithdraw).value)}
        >
          Withdraw
        </Button>
      </Box>
    </Box>
  )
}
