import { Box, Button } from '@chakra-ui/react'
import { CheckerSelectBoxField } from '@form'
import React, { FunctionComponent, useMemo } from 'react'
import { useFormManager } from 'vdr-react-form-manager'
import { AddLiquidityCtezField } from './component/add-liquidity-ctez-field'
import { AddLiquidityDeadlineField } from './component/add-liquidity-deadline-field'
import { AddLiquidityKitField } from './component/add-liquidity-kit-field'
import { AddLiquidityMinTokenField } from './component/add-liquidity-min-token-field'
import {
  checkerAdressField,
  ctezField,
  deadLineField,
  getCfmmOpeAddLiquidityFormModel,
  kitField,
  minTokensField,
} from './component/cfmm-ope-add-liquidity.model'
import { useDispatchCfmmOpeAddLiquidity } from './useDispatchCfmmOpeAddLiquidity'

type Props = {
  callBack: () => void
}

export const CfmmOpeAddLiquidityForm: FunctionComponent<Props> = ({ callBack }) => {
  const formModel = useMemo(() => getCfmmOpeAddLiquidityFormModel(), [])

  const { addLiquidity } = useDispatchCfmmOpeAddLiquidity(callBack)
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
      <Box fontSize="2xl">Add Liquidity</Box>
      <CheckerSelectBoxField {...getInputProps(checkerAdressField)} />
      <AddLiquidityCtezField {...getInputProps(ctezField)} />
      <AddLiquidityKitField {...getInputProps(kitField)} />
      <AddLiquidityMinTokenField {...getInputProps(minTokensField)} />
      <AddLiquidityDeadlineField {...getInputProps(deadLineField)} onDateChange={updateDate} />
      <Box textAlign="right">
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() =>
            addLiquidity(
              getInputProps(checkerAdressField).value,
              getInputProps(ctezField).value,
              getInputProps(kitField).value,
              getInputProps(minTokensField).value,
              getInputProps(deadLineField).value,
            )
          }
        >
          Add liquidity
        </Button>
      </Box>
    </Box>
  )
}
