import { Box, Button } from '@chakra-ui/react'
import { debounce } from 'lodash'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BuyKitAmountField } from './component/buy-kit-amount-field'
import { BuyKitDeadlineField } from './component/buy-kit-deadline-field'
import {
  amount,
  checkerAdress,
  deadLine,
  getCfmmOpeBuyKitFormModel,
  minAmount,
} from './component/cfmm-ope-buy-kit.model'
import { useDispatchCfmmOpeBuyKit } from './useDispatchCfmmOpeBuyKit'

type Props = {
  token: string
}

export const CfmmOpeBuyKitForm: FunctionComponent<Props> = ({ token }) => {
  const formModel = useMemo(() => getCfmmOpeBuyKitFormModel(), [])

  const { buyKit } = useDispatchCfmmOpeBuyKit()
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const updateDate = (date: Date) => updateInputs({ [deadLine]: { value: date } })

  const debounceFn = useCallback(
    debounce((e) => console.log(e), 500),
    [],
  )

  return (
    <Box
      onChange={handleFormChange}
      as="form"
      w="100%"
      border="1px solid"
      borderColor="gray.200"
      p="20px"
    >
      <BuyKitAmountField
        {...getInputProps(amount)}
        inputProps={{
          onKeyUp: debounceFn,
        }}
      />

      <BuyKitDeadlineField {...getInputProps(deadLine)} onDateChange={updateDate} />
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() =>
            buyKit(
              getInputProps(checkerAdress).value,
              getInputProps(amount).value,
              getInputProps(minAmount).value,
              getInputProps(deadLine).value,
            )
          }
        >
          Buy Kits
        </Button>
      </Box>
    </Box>
  )
}
