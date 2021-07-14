import { useMetaViewBuyKitMinKitExpected } from '@burrow-matadata-operation'
import { Box, HStack } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { ActionButton } from '@form'
import { SlippageAndDeadLineSetting } from '@shared/ui'
import BigNumber from 'bignumber.js'
import { debounce } from 'lodash'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BuyKitAmountField } from './component/buy-kit-amount-field'
import { BuyKitDeadlineField } from './component/buy-kit-deadline-field'
import {
  amount,
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

  const [{ status, minKitExpected }, load] = useMetaViewBuyKitMinKitExpected(token)

  const { buyKit } = useDispatchCfmmOpeBuyKit(token)
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const updateDate = (date: Date) => updateInputs({ [deadLine]: { value: date } })

  // as we use useCallback we can not use getInputProps(amount).value
  const amountDebounceFn = useCallback(
    debounce((e) => {
      load(new BigNumber(e.target.value))
    }, 500),
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
          onKeyUp: amountDebounceFn,
        }}
      />

      <HStack justifyContent="space-between">
        <Box as="span">Min kit expected</Box>
        <Box as="span" fontWeight="bold">
          {minKitExpected.toString()} {status}
        </Box>
      </HStack>

      <BuyKitDeadlineField {...getInputProps(deadLine)} onDateChange={updateDate} />
      <Box textAlign="right">
        <ActionButton
          label="buy kits"
          isDisabled={!isFormValid || status === RequestStatus.error}
          isLoading={status === RequestStatus.pending}
          onClick={() =>
            buyKit(
              getInputProps(amount).value,
              getInputProps(minAmount).value,
              getInputProps(deadLine).value,
            )
          }
        >
          Buy Kits
        </ActionButton>

        <SlippageAndDeadLineSetting splippage="0.10%" deadLine="20min" />
      </Box>
    </Box>
  )
}
