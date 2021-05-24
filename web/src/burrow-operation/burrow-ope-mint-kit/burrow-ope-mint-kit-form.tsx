import { Box, Button } from '@chakra-ui/react'
import { TzFormatMutezToTz } from '@config'
import { useGetStorage } from '@storage'
import React, { FunctionComponent, useMemo } from 'react'
import { StorageRow } from 'src/storage/state/storage-state.type'
import { useFormManager } from 'vdr-react-form-manager'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import { getMaxAmountToMint } from './burrow-ope-mint-kit.util'
import { getBurrowOpeMintKitFormModel, tezToMint } from './component/burrow-ope-mint.model'
import { MintAmountField } from './component/mint-tez-amount-field'
import { useDispatchBurrowOpeMint } from './useDispatchBurrowOpeMintKit'

type Props = {
  burrow: BurrowRowState
  callBack: () => void
}

export const BurrowOpeMintKitForm: FunctionComponent<Props> = ({
  burrow: { burrowId, scAddress },
  callBack,
}) => {
  const { burrowStorage } = useGetStorage(burrowId) as StorageRow
  console.log(burrowStorage)
  const maxAmount = getMaxAmountToMint(burrowStorage)
  const formModel = useMemo(() => getBurrowOpeMintKitFormModel(maxAmount), [maxAmount])
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(formModel)
  const { mint } = useDispatchBurrowOpeMint(burrowId, scAddress, callBack)

  return (
    <Box
      onChange={handleFormChange}
      as="form"
      w="100%"
      border="1px solid"
      borderColor="gray.200"
      p="20px"
    >
      <Box fontSize="2xl">Mint</Box>
      <MintAmountField {...getInputProps(tezToMint)} />
      <Box fontSize="xs" textAlign="right">
        {TzFormatMutezToTz(burrowStorage.collateral).toString()}
        {' collateral'}- {burrowStorage.outstanding_kit.toString()}
        {' outstanding kit'} = <b>{maxAmount.toString()}</b>
        {' mintable Tez'}
      </Box>
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() => mint(getInputProps(tezToMint).value)}
        >
          Mint
        </Button>
      </Box>
    </Box>
  )
}
