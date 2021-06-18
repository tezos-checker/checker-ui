import { Box, Button } from '@chakra-ui/react'
import { CheckerSelectBoxField } from '@form'
import React, { FunctionComponent, useMemo } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import {
  checkerAdressField,
  deadLineField,
  getCfmmOpeRemoveLiquidityFormModel,
  kitField,
  minKitField,
  minTezField,
} from './component/cfmm-ope-remove-liquidity.model'
import { RemoveLiquidityDeadlineField } from './component/remove-liquidity-deadline-field'
import { RemoveLiquidityKitField } from './component/remove-liquidity-kit-field'
import { RemoveLiquidityMinKitField } from './component/remove-liquidity-min-kit-field'
import { RemoveLiquidityMinTezField } from './component/remove-liquidity-min-tez-field'
import { useDispatchCfmmOpeRemoveLiquidity } from './useDispatchCfmmOpeRemoveLiquidity'

type Props = {
  callBack: () => void
}

export const CfmmOpeRemoveLiquidityForm: FunctionComponent<Props> = ({ callBack }) => {
  const formModel = useMemo(() => getCfmmOpeRemoveLiquidityFormModel(), [])

  const { removeLiquidity } = useDispatchCfmmOpeRemoveLiquidity(callBack)
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const updateDate = (date: Date) => updateInputs({ [deadLineField]: { value: date } })

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
      <CheckerSelectBoxField {...getInputProps(checkerAdressField)} />
      <RemoveLiquidityKitField {...getInputProps(kitField)} />
      <RemoveLiquidityMinTezField {...getInputProps(minTezField)} />
      <RemoveLiquidityMinKitField {...getInputProps(minKitField)} />
      <RemoveLiquidityDeadlineField {...getInputProps(deadLineField)} onDateChange={updateDate} />
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() =>
            removeLiquidity(
              getInputProps(checkerAdressField).value,
              getInputProps(kitField).value,
              getInputProps(minTezField).value,
              getInputProps(minKitField).value,
              getInputProps(deadLineField).value,
            )
          }
        >
          Remove liquidity
        </Button>
      </Box>
    </Box>
  )
}
