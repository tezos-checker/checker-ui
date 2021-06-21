import { Box, Button } from '@chakra-ui/react'
import { CheckerSelectBoxField } from '@form'
import React, { FunctionComponent, useMemo } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import {
  amount,
  checkerAdress,
  deadLine,
  getCfmmOpeSellKitFormModel,
  minAmount,
} from './component/cfmm-ope-sell-kit.model'
import { SellKitAmountField } from './component/sell-kit-amount-field'
import { SellKitDeadlineField } from './component/sell-kit-deadline-field'
import { SellKitMinAmountField } from './component/sell-kit-min-amount-field'
import { useDispatchCfmmOpeSellKit } from './useDispatchCfmmOpeSellKit'

type Props = {
  callBack: () => void
}

export const CfmmOpeSellKitForm: FunctionComponent<Props> = ({ callBack }) => {
  const formModel = useMemo(() => getCfmmOpeSellKitFormModel(), [])

  const { sellKit } = useDispatchCfmmOpeSellKit(callBack)
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const updateDate = (date: Date) => updateInputs({ [deadLine]: { value: date } })

  return (
    <Box
      onChange={handleFormChange}
      as="form"
      w="100%"
      border="1px solid"
      borderColor="gray.200"
      p="20px"
    >
      <Box fontSize="2xl">Sell Kits</Box>
      <CheckerSelectBoxField {...getInputProps(checkerAdress)} />
      <SellKitAmountField {...getInputProps(amount)} />
      <SellKitMinAmountField {...getInputProps(minAmount)} />
      <SellKitDeadlineField {...getInputProps(deadLine)} onDateChange={updateDate} />
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() =>
            sellKit(
              getInputProps(checkerAdress).value,
              getInputProps(amount).value,
              getInputProps(minAmount).value,
              getInputProps(deadLine).value,
            )
          }
        >
          Sell Kits
        </Button>
      </Box>
    </Box>
  )
}
