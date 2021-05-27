import { BurrowRowState } from '@burrow'
import { Box, Button } from '@chakra-ui/react'
import { useGetStorage } from '@storage'
import React, { FunctionComponent, useMemo } from 'react'
import { StorageRow } from 'src/storage/state/storage-state.type'
import { useFormManager } from 'vdr-react-form-manager'
import {
  amount,
  deadLine,
  getBurrowOpeBuyKitFormModel,
  minAmount,
} from './component/burrow-ope-buy-kit.model'
import { BuyKitAmountField } from './component/buy-kit-amount-field'
import { BuyKitDeadlineField } from './component/buy-kit-deadline-field'
import { BuyKitMinAmountField } from './component/buy-kit-min-amount-field'
import { useDispatchBurrowOpeBuyKit } from './useDispatchBurrowOpeBuyKit'

type Props = {
  burrow: BurrowRowState
  callBack: () => void
}

export const BurrowOpeBuyKitForm: FunctionComponent<Props> = ({
  burrow: { burrowId, scAddress },
  callBack,
}) => {
  const { burrowStorage } = useGetStorage(burrowId) as StorageRow

  const formModel = useMemo(() => getBurrowOpeBuyKitFormModel(), [])

  const { buyKit } = useDispatchBurrowOpeBuyKit(burrowId, scAddress, callBack)
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
      <Box fontSize="2xl">Burn Kits</Box>
      <BuyKitAmountField {...getInputProps(amount)} />
      <BuyKitMinAmountField {...getInputProps(minAmount)} />
      <BuyKitDeadlineField {...getInputProps(deadLine)} onDateChange={updateDate} />
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() =>
            buyKit(
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
