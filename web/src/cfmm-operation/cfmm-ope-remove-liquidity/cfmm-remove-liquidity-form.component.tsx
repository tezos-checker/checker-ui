import { Box } from '@chakra-ui/react'
import { Checker } from '@config'
import { ActionButton, InputInfo } from '@form'
import {
  useMetaViewRemoveLiquidityMinCtezWithdrawn,
  useMetaViewRemoveLiquidityMinKitWithdrawn,
} from '@meta-view-operation'
import { isNumberPressed } from '@shared/utils'
import BigNumber from 'bignumber.js'
import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { useFormManager } from 'vdr-react-form-manager'
import { deadLine, getMinOneMutezValidator } from '../swap-operation-buy/swap-ope-buy-kit.model'
import {
  amount,
  getCfmmOpeRemoveLiquidityFormModel,
  minCtez,
  minKit,
} from './cfmm-remove-liquidity.model'
import { RemoveLiquidityAmount } from './form-fields/remove-liquidity-amount.component'
import { useDispatchCfmmOpeRemoveLiquidity } from './useDispatchCfmmOpeRemoveLiquidity'

type Props = {
  checker: Checker
}

const amountChanged: Subject<string> = new Subject<string>()

export const CfmmRemoveLiquidityForm: FunctionComponent<Props> = ({ checker }) => {
  const formModel = useMemo(() => getCfmmOpeRemoveLiquidityFormModel(), [])

  const history = useHistory()

  const { removeLiquidity } = useDispatchCfmmOpeRemoveLiquidity(checker.address)
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const [
    { status: minKitStatus },
    loadMinKit,
  ] = useMetaViewRemoveLiquidityMinKitWithdrawn(checker.address, (resMinKit) =>
    updateInputs({ [minKit]: { value: resMinKit.toString() } }),
  )

  const [
    { status: minCtezStatus },
    loadMinCtez,
  ] = useMetaViewRemoveLiquidityMinCtezWithdrawn(checker.address, (resMinCtez) =>
    updateInputs({ [minCtez]: { value: resMinCtez.toString() } }),
  )

  useEffect(() => {
    const observer = amountChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((i: string) => new BigNumber(i)),
        filter((x: BigNumber) => getMinOneMutezValidator().validate(x) === null),
      )
      .subscribe((model: BigNumber) => {
        loadMinKit(new BigNumber(model))
        loadMinCtez(new BigNumber(model))
      })
    return () => observer.unsubscribe()
  }, [])

  return (
    <Box onChange={handleFormChange} as="form" w="100%">
      <RemoveLiquidityAmount
        {...getInputProps(amount)}
        inputProps={{
          onKeyDown: (e) => {
            if (isNumberPressed(e.keyCode)) {
              updateInputs({ [minKit]: { value: '' }, [minCtez]: { value: '' } })
            }
          },
          onKeyUp: (e) => {
            amountChanged.next(e.currentTarget.value)
          },
        }}
        symbol={'MULQT'}
      />
      <InputInfo
        status={minCtezStatus}
        label="Min ctez"
        value={getInputProps(minCtez).value}
        name={minCtez}
        symbol="CTEZ"
      />
      <InputInfo
        status={minKitStatus}
        label="Min kit"
        name={minKit}
        value={getInputProps(minKit).value}
        symbol="KIT"
      />

      <ActionButton
        colorScheme="blue"
        mt="70px"
        mb="20px"
        w="100%"
        label="Remove liquidity"
        isDisabled={!isFormValid}
        onClick={() => {
          removeLiquidity(
            getInputProps(amount).value,
            getInputProps(minCtez).value,
            getInputProps(minKit).value,
            getInputProps(deadLine).value,
          )
          history.push('/')
        }}
      />
    </Box>
  )
}
