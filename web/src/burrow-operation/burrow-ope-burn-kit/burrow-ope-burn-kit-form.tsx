import { Box, Button } from '@chakra-ui/react'
import { useGetStorage } from '@storage'
import React, { FunctionComponent, useMemo } from 'react'
import { StorageRow } from 'src/storage/state/storage-state.type'
import { useFormManager } from 'vdr-react-form-manager'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import { BurnKitAmountField } from './component/burn-kit-amount-field'
import { amoutToBurn, getBurrowOpeBurnKitFormModel } from './component/burrow-ope-burn-kit.model'
import { useDispatchBurrowOpeBurnKit } from './useDispatchBurrowOpeBurnKit'

type Props = {
  burrow: BurrowRowState
  callBack: () => void
}

export const BurrowOpeBurnKitForm: FunctionComponent<Props> = ({
  burrow: { burrowId, scAddress },
  callBack,
}) => {
  const { burrowStorage } = useGetStorage(burrowId) as StorageRow

  const formModel = useMemo(() => getBurrowOpeBurnKitFormModel(burrowStorage.outstanding_kit), [
    burrowStorage.outstanding_kit,
  ])

  const { burnKit } = useDispatchBurrowOpeBurnKit(burrowId, scAddress, callBack)
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

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
      <BurnKitAmountField {...getInputProps(amoutToBurn)} />
      <Box fontSize="xs" textAlign="right">
        {'Max '} <b>{burrowStorage.outstanding_kit.toString()}</b>
        {' kits can be burnt'}
      </Box>
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() => burnKit(getInputProps(amoutToBurn).value)}
        >
          Burn Kits
        </Button>
      </Box>
    </Box>
  )
}
