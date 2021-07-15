import { useMetaViewBuyKitMinKitExpected } from '@burrow-matadata-operation'
import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { ActionButton } from '@form'
import { LoadingBox, SlippageAndDeadLineSetting } from '@shared/ui'
import BigNumber from 'bignumber.js'
import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { useFormManager } from 'vdr-react-form-manager'
import { BuyKitAmountField } from './component/buy-kit-amount-field'
import {
  amount,
  deadLine,
  getCfmmOpeBuyKitFormModel,
  getMinOneMutezValidator,
  minAmount,
} from './component/cfmm-ope-buy-kit.model'
import { MinKitExpectedField } from './component/min-kit-expected-field'
import { useDispatchCfmmOpeBuyKit } from './useDispatchCfmmOpeBuyKit'

type Props = {
  address: string
}
const amountChanged: Subject<string> = new Subject<string>()

export const CfmmOpeBuyKitForm: FunctionComponent<Props> = ({ address }) => {
  const formModel = useMemo(() => getCfmmOpeBuyKitFormModel(), [])

  const { buyKit } = useDispatchCfmmOpeBuyKit(address)
  const {
    handleFormChange,
    getInputProps,
    updateInputs,
    formProperties: { isFormValid },
  } = useFormManager(formModel)
  const [{ status }, load] = useMetaViewBuyKitMinKitExpected(address, (minKitExpected) =>
    updateInputs({ [minAmount]: { value: minKitExpected.toString() } }),
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
      <BuyKitAmountField
        {...getInputProps(amount)}
        inputProps={{
          onKeyDown: () => {
            updateInputs({ [minAmount]: { value: 0 } })
          },
          onKeyUp: (e) => {
            amountChanged.next(e.currentTarget.value)
          },
        }}
      />
      <Box position="relative">
        <NavLink to="/sell">
          <IconButton
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
        </NavLink>
      </Box>

      <LoadingBox status={status}>
        <MinKitExpectedField {...getInputProps(minAmount)} />
      </LoadingBox>

      <ActionButton
        colorScheme="blue"
        mt="70px"
        mb="20px"
        w="100%"
        label="SWAP"
        isDisabled={!isFormValid || status === RequestStatus.error}
        onClick={() =>
          buyKit(
            getInputProps(amount).value,
            getInputProps(minAmount).value,
            getInputProps(deadLine).value,
          )
        }
      />

      <SlippageAndDeadLineSetting splippage="0.10%" deadLine="20min" />
    </Box>
  )
}
