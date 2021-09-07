import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import {
  burrowOpeDepositCollateralFormModel,
  inputDeposit,
} from './burrow-ope-deposit-collateral.model'
import { DepositCollateralAmountField } from './component/deposit-colleteral-amount-field'
import { useDispatchBurrowOpeDepositCollateral } from './useDispatchBurrowOpeDepositCollateral'

type Props = {
  burrow: BurrowRowState
  callBack: () => void
}

export const BurrowOpeDepositCollateralForm: FunctionComponent<Props> = ({
  burrow: { burrowId, scAddress },
  callBack,
}) => {
  const { DepositCollateral } = useDispatchBurrowOpeDepositCollateral(burrowId, scAddress, callBack)
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(burrowOpeDepositCollateralFormModel)

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
      <DepositCollateralAmountField {...getInputProps(inputDeposit)} />
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() => DepositCollateral(getInputProps(inputDeposit).value)}
        >
          Deposit
        </Button>
      </Box>
    </Box>
  )
}
