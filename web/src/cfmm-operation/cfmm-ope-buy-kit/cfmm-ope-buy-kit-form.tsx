import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent, useMemo } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BuyKitAmountField } from './component/buy-kit-amount-field'
import { BuyKitDeadlineField } from './component/buy-kit-deadline-field'
import { BuyKitMinAmountField } from './component/buy-kit-min-amount-field'
import {
  amount,
  deadLine,
  getCfmmOpeBuyKitFormModel,
  minAmount,
} from './component/cfmm-ope-buy-kit.model'

export const CfmmOpeBuyKitForm: FunctionComponent = () => {
  const formModel = useMemo(() => getCfmmOpeBuyKitFormModel(), [])

  //  const { buyKit } = useDispatchCfmmOpeBuyKit(burrowId, scAddress, callBack)
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
      <Box fontSize="2xl">Buy Kits</Box>
      <BuyKitAmountField {...getInputProps(amount)} />
      <BuyKitMinAmountField {...getInputProps(minAmount)} />
      <BuyKitDeadlineField {...getInputProps(deadLine)} onDateChange={updateDate} />
      <Box textAlign="right">
        <Button disabled={!isFormValid} mt="15px" onClick={() => alert('ok')}>
          Buy Kits
        </Button>
      </Box>
    </Box>
  )
}
