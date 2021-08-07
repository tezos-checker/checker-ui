import { Box } from '@chakra-ui/react'
import { Checker } from '@config'
import { ActionButton, InputInfo } from '@form'
import {
  useMetaViewAddLiquidityMaxKitDeposed,
  useMetaViewAddLiquidityMinLqtMinted,
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
  getCfmmOpeAddLiquidityFormModel,
  maxExpected,
  minToken,
} from './cfmm-ope-add-liquidity.model'
import { AddLiquidityAmount } from './form-fields/add-liquidity-amount.component'
import { useDispatchCfmmOpeAddLiquidity } from './useDispatchCfmmOpeAddLiquidity'

type Props = {
  checker: Checker
}

const amountChanged: Subject<string> = new Subject<string>()

export const CfmmOpeAddLiquidityForm: FunctionComponent<Props> = ({ checker }) => {
  const formModel = useMemo(() => getCfmmOpeAddLiquidityFormModel(), [])

  const history = useHistory()

  const { addLiquidity } = useDispatchCfmmOpeAddLiquidity(checker.address)
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const [
    { status: maxKitDeposedStatus },
    loadMaxResult,
  ] = useMetaViewAddLiquidityMaxKitDeposed(checker.address, (resMaxExpected) =>
    updateInputs({ [maxExpected]: { value: resMaxExpected.toString() } }),
  )

  const [
    { status: minTokenStatus },
    loadMinToken,
  ] = useMetaViewAddLiquidityMinLqtMinted(checker.address, (resMinToken) =>
    updateInputs({ [minToken]: { value: resMinToken.toString() } }),
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
        loadMaxResult(new BigNumber(model))
        loadMinToken(new BigNumber(model))
      })
    return () => observer.unsubscribe()
  }, [])

  return (
    <Box onChange={handleFormChange} as="form" w="100%">
      <AddLiquidityAmount
        {...getInputProps(amount)}
        inputProps={{
          onKeyDown: (e) => {
            if (isNumberPressed(e.keyCode)) {
              updateInputs({ [minToken]: { value: '' }, [maxExpected]: { value: '' } })
            }
          },
          onKeyUp: (e) => {
            amountChanged.next(e.currentTarget.value)
          },
        }}
        symbol={'CTEZ'}
      />
      <InputInfo
        status={maxKitDeposedStatus}
        label="Max result"
        value={getInputProps(maxExpected).value}
        name={maxExpected}
        symbol="KIT"
      />
      <InputInfo
        status={minTokenStatus}
        label="Min token expected"
        name={minToken}
        value={getInputProps(minToken).value}
        symbol="MULQT"
      />

      <ActionButton
        colorScheme="blue"
        mt="70px"
        mb="20px"
        w="100%"
        label="Add liquidity"
        isDisabled={!isFormValid}
        onClick={() => {
          addLiquidity(
            getInputProps(amount).value,
            getInputProps(maxExpected).value,
            getInputProps(minToken).value,
            getInputProps(deadLine).value,
          )
          history.push('/')
        }}
      />
    </Box>
  )
}
