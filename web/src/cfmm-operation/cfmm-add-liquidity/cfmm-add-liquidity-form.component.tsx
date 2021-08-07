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
import { AddLiquidityAmount } from './component/add-liquidity-amount.component'
import {
  amount,
  getCfmmOpeAddLiquidityFormModel,
  maxResult,
  minToken,
} from './component/cfmm-ope-add-liquidity.model'
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
  ] = useMetaViewAddLiquidityMaxKitDeposed(checker.address, (resMaxResult) =>
    updateInputs({ [maxResult]: { value: resMaxResult.toString() } }),
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
              updateInputs({ [minToken]: { value: '' }, [maxResult]: { value: '' } })
            }
          },
          onKeyUp: (e) => {
            amountChanged.next(e.currentTarget.value)
          },
        }}
        symbol={'tez'}
      />
      <InputInfo
        status={maxKitDeposedStatus}
        label="Max result"
        value={getInputProps(maxResult).value}
        name={maxResult}
        symbol="kit"
      />
      <InputInfo
        status={minTokenStatus}
        label="Min token expected"
        name={minToken}
        value={getInputProps(minToken).value}
        symbol="mulqt"
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
            getInputProps(maxResult).value,
            getInputProps(minToken).value,
            getInputProps(deadLine).value,
          )
          history.push('/')
        }}
      />
    </Box>
  )
}
