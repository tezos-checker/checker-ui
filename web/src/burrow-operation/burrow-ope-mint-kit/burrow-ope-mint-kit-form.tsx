import { Box, Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import { burrowOpeMintFormModel, tezToMint } from './component/burrow-ope-mint.model'
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
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(burrowOpeMintFormModel)
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
