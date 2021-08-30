import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { ActionButton, InputInfo } from '@form'
import { useMetaViewBuyKitMinKitExpected } from '@meta-view-operation'
import { SlippageAndDeadLineSetting } from '@shared/ui'
import { isNumberPressed } from '@shared/utils'
import { Checker } from '@wallet'
import BigNumber from 'bignumber.js'
import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { useFormManager } from 'vdr-react-form-manager'
import { BuyAmount } from './form-fields/buy-amount.component'
import {
  amount,
  deadLine,
  getMinOneMutezValidator,
  getSwapOpeBuyFormModel,
  minExpected,
  slippage,
} from './swap-ope-buy-kit.model'
import { useDispatchCfmmOpeBuyKit } from './useDispatchSwapOpeBuy.hooks'

type Props = {
  checker: Checker
  onClickSwitch: (tabIndex: number) => void
}
const amountChanged: Subject<string> = new Subject<string>()

export const SwapOpeBuyForm: FunctionComponent<Props> = ({ checker, onClickSwitch }) => {
  const formModel = useMemo(() => getSwapOpeBuyFormModel(), [])

  const history = useHistory()

  const { dispatchBuy } = useDispatchCfmmOpeBuyKit(checker.address)
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const [{ status }, load] = useMetaViewBuyKitMinKitExpected(checker.address, (minKitExpected) =>
    updateInputs({ [minExpected]: { value: minKitExpected.toString() } }),
  )

  useEffect(() => {
    const observer = amountChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((i: string) => new BigNumber(i)),
        filter((x: BigNumber) => getMinOneMutezValidator().validate(x) === null),
      )
      .subscribe((model: BigNumber) => load(new BigNumber(model)))
    return () => observer.unsubscribe()
  }, [])

  return (
    <Box onChange={handleFormChange} as="form" w="100%">
      <BuyAmount
        {...getInputProps(amount)}
        inputProps={{
          onKeyDown: (e) => {
            if (isNumberPressed(e.keyCode)) {
              updateInputs({ [minExpected]: { value: '' } })
            }
          },
          onKeyUp: (e) => {
            amountChanged.next(e.currentTarget.value)
          },
        }}
        symbol={checker.buyFromSymbol}
      />
      <Box position="relative">
        <IconButton
          onClick={() => onClickSwitch(1)}
          position="absolute"
          zIndex="1"
          aria-label="switch"
          size="sm"
          borderRadius="full"
          right="10px"
          top="-8px"
          colorScheme="blue"
          icon={<ArrowUpDownIcon />}
        />
      </Box>

      <InputInfo
        status={status}
        label="Min kit expected"
        value={getInputProps(minExpected).value}
        name={minExpected}
        symbol={checker.buyToSymbol}
      />

      <ActionButton
        colorScheme="blue"
        mt="70px"
        mb="20px"
        w="100%"
        label="SWAP"
        isDisabled={!isFormValid || status === RequestStatus.error}
        onClick={() => {
          dispatchBuy(
            getInputProps(amount).value,
            getInputProps(minExpected).value,
            getInputProps(deadLine).value,
            getInputProps(slippage).value,
          )
          history.push('/')
        }}
      />

      <SlippageAndDeadLineSetting
        splippage={getInputProps(slippage).value}
        deadLine={getInputProps(deadLine).value}
      />
    </Box>
  )
}
