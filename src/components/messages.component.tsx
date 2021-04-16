import BigNumber from 'bignumber.js'
import React from 'react'
import { tokenAmountInUnitsWithSymbol } from '../utils/tool'
import BetterCallDevTransaction from './betterCallDev.component'

export const AllowMessage = ({
  hash,
  amount,
  decimals,
  symbol,
}: {
  hash: string
  amount: BigNumber
  decimals: BigNumber
  symbol: string
}) => (
  <>
    <strong>Allow</strong>
    <div>
      Allow of {tokenAmountInUnitsWithSymbol(amount, decimals, symbol)} successfully. See
      transaction right <BetterCallDevTransaction title={'here'} hash={hash} />
    </div>
  </>
)

export const TransferMessage = ({
  hash,
  amount,
  decimals,
  symbol,
}: {
  hash: string
  amount: BigNumber
  decimals: BigNumber
  symbol: string
}) => (
  <>
    <strong>Transfer</strong>
    <div>
      The transfer of {tokenAmountInUnitsWithSymbol(amount, decimals, symbol)} was successfully. See
      transaction right <BetterCallDevTransaction title={'here'} hash={hash} />
    </div>
  </>
)

export const MintMessage = ({
  hash,
  amount,
  decimals,
  symbol,
}: {
  hash: string
  amount: BigNumber
  decimals: BigNumber
  symbol: string
}) => (
  <>
    <strong>Mint</strong>
    <div>
      The mint of {tokenAmountInUnitsWithSymbol(amount, decimals, symbol)} was successfully. See
      transaction right <BetterCallDevTransaction title={'here'} hash={hash} />
    </div>
  </>
)
