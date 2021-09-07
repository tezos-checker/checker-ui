import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { ActionButton, InputInfo } from '@form'
import { useMetaViewSellKitMinCtezExpected } from '@meta-view-operation'
import { SlippageAndDeadLineSetting } from '@shared/ui'
import { isNumberPressed } from '@shared/utils'
import { Checker, useGetUserBalance } from '@wallet'
import BigNumber from 'bignumber.js'
import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { useFormManager } from 'vdr-react-form-manager'
import { SellAmount } from './form-fields/sell-amount.component'
import {
  deadLine,
  getMinOneMutezValidator,
  getSwapOpeSellFormModel,
  sellFrom,
  sellTo,
  slippage,
} from './swap-ope-sell.model'
import { useDispatchSwapOpeSell } from './useDispatchSwapOpeSell.hooks'

type Props = {
  checker: Checker
  onClickSwitch: (tabIndex: number) => void
}
const amountChanged: Subject<string> = new Subject<string>()

export const SwapOpeSellForm: FunctionComponent<Props> = ({ checker, onClickSwitch }) => {
  const formModel = useMemo(() => getSwapOpeSellFormModel(), [])

  const history = useHistory()

  const { dispatchSell } = useDispatchSwapOpeSell(checker.address)
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const [
    { status: minKitExpectedStatus },
    loadMinKitExpected,
  ] = useMetaViewSellKitMinCtezExpected(checker.address, (minCtezExpected) =>
    updateInputs({ [sellTo]: { value: minCtezExpected.toString() } }),
  )

  // user needs to be connected to get the balance
  // otherwise the balance will not be shown in the form
  const [
    { status: balanceStatus, balance: userBalance },
    loadBalance,
  ] = useGetUserBalance(checker.address, (balance: BigNumber) => console.log('BALANCE', balance))

  useEffect(() => {
    const observer = amountChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((i: string) => new BigNumber(i)),
        filter((x: BigNumber) => getMinOneMutezValidator().validate(x) === null),
      )
      .subscribe((model: BigNumber) => {
        const amount = new BigNumber(model)
        loadMinKitExpected(amount)

        // load balance
        if (balanceStatus !== RequestStatus.success) {
          loadBalance(amount)
        }
      })
    return () => observer.unsubscribe()
  }, [])

  return (
    <Box onChange={handleFormChange} as="form" w="100%">
      <SellAmount
        {...getInputProps(sellFrom)}
        inputProps={{
          onKeyDown: (e) => {
            if (isNumberPressed(e.keyCode)) {
              updateInputs({ [sellTo]: { value: 0 } })
            }
          },
          onKeyUp: (e) => {
            amountChanged.next(e.currentTarget.value)
          },
        }}
        symbol={checker.buyToSymbol}
      />

      <Box position="relative">
        <IconButton
          onClick={() => onClickSwitch(0)}
          position="absolute"
          zIndex="1"
          aria-label="switch"
          size="sm"
          borderRadius="full"
          right="10px"
          top="-8px"
          colorScheme="blue"
          icon={<ArrowUpDownIcon />}
          isLoading={minKitExpectedStatus === RequestStatus.pending}
        />
      </Box>

      <InputInfo
        status={minKitExpectedStatus}
        label="Min ctez expected"
        value={getInputProps(sellTo).value}
        name={sellTo}
        symbol={'CTEZ'}
        onRetry={() => loadMinKitExpected(new BigNumber(getInputProps(sellFrom).value))}
      />

      {balanceStatus === RequestStatus.success ? (
        <Box as="span">balance: {userBalance.toNumber()}</Box>
      ) : null}

      <ActionButton
        colorScheme="blue"
        mt="70px"
        mb="20px"
        w="100%"
        label="SWAP"
        isDisabled={!isFormValid || minKitExpectedStatus === RequestStatus.error}
        onClick={() => {
          dispatchSell(
            getInputProps(sellFrom).value,
            getInputProps(sellTo).value,
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
