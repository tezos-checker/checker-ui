import { useBurrowMaxMintableKits } from '@burrow-matadata-operation'
import { Box, Button } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { getMaxNumberValidator } from '@form'
import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { BurrowRowState } from '../../burrow/state/burrow-state.type'
import { getBurrowOpeMintKitFormModel, tezToMint } from './component/burrow-ope-mint.model'
import { MintKitAmountField } from './component/mint-kit-amount-field'
import { useDispatchBurrowOpeMint } from './useDispatchBurrowOpeMintKit'

type Props = {
  burrow: BurrowRowState
  callBack: () => void
}

export const BurrowOpeMintKitForm: FunctionComponent<Props> = ({
  burrow: { burrowId, scAddress },
  callBack,
}) => {
  const [{ maxMintableKits, status: maxMintableKitsStatus }, reload] = useBurrowMaxMintableKits(
    scAddress,
    burrowId,
  )
  const formModel = useMemo(() => getBurrowOpeMintKitFormModel(), [])
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
    updateInputs,
  } = useFormManager(formModel)

  // if maxMintableKitsStatus is loading/error, we don't block the user
  // the transaction will fail if kits are invalid
  // if maxMintableKitsStatus is success => we add the max amount validation
  useEffect(() => {
    if (maxMintableKitsStatus === RequestStatus.success) {
      updateInputs({ [tezToMint]: { validators: [getMaxNumberValidator(maxMintableKits)] } })
    } else {
      updateInputs({ [tezToMint]: { validators: [] } })
    }
  }, [maxMintableKits, maxMintableKitsStatus])

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
      <MintKitAmountField {...getInputProps(tezToMint)} />
      <Box fontSize="xs" textAlign="right">
        {maxMintableKitsStatus === RequestStatus.success ? maxMintableKits.toString() : null}
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
