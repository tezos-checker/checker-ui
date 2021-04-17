import { InMemorySigner } from '@taquito/signer'
import { validateKeyHash, ValidationResult } from '@taquito/utils'
import BigNumber from 'bignumber.js'
import { BAKING_BAD_API, TEZOS_RPC as rpc, TOKEN_CONTRACT_ADDRESS } from '../config/constants'
import TezosSingleton from '../services/tezos-singleton.class'
import { Account } from './types'

export const truncateStringInTheMiddle = (
  str: string,
  strPositionStart: number,
  strPositionEnd: number,
): string => {
  const minTruncatedLength = strPositionStart + strPositionEnd
  if (minTruncatedLength < str.length) {
    return `${str.substr(0, strPositionStart)}...${str.substr(
      str.length - strPositionEnd,
      str.length,
    )}`
  }
  return str
}

export const tzFormatter = (amount: string | number | BigNumber, format: string): string => {
  const bigNum = new BigNumber(amount)
  if (bigNum.isNaN()) {
    return amount as string
  }

  if (format === 'tz') {
    return `${TezosSingleton.getInstance().format('mutez', 'tz', amount)} ꜩ`
  }
  if (format === 'mtz') {
    return `${TezosSingleton.getInstance().format('mutez', 'mtz', amount)} mꜩ`
  }
  return bigNum.toString()
}

export const percentageFormatter = (amount: unknown): string => {
  const bigNum = new BigNumber(amount as any)
  if (bigNum.isNaN()) {
    return amount as string
  }

  return `${bigNum.toFixed(4)} %`
}

export const activateAccount = async (account: Account): Promise<void> => {
  try {
    const { email, password, mnemonic, pkh, secret } = account
    const signer = InMemorySigner.fromFundraiser(email, password, mnemonic.join(' '))
    TezosSingleton.getInstance().setProvider({ rpc, signer })
    const operation = await TezosSingleton.getInstance().tz.activate(pkh, secret)
    await operation.confirmation()
  } catch (err) {
    // eslint-disable-next-line
    console.error(err.message)
  }
}

export const getAddressFromAccount = async (account: Account): Promise<string> => {
  const { email, password, mnemonic } = account
  const signer = InMemorySigner.fromFundraiser(email, password, mnemonic.join(' '))
  return signer.publicKeyHash()
}

export const tokenAmountInUnitsToBigNumber = (
  amount: BigNumber,
  decimals: BigNumber,
): BigNumber => {
  const decimalsPerToken = new BigNumber(10).pow(decimals)
  return amount.dividedBy(decimalsPerToken)
}

export const tokenAmountInUnits = (
  amount: BigNumber,
  decimals: BigNumber,
  toFixedDecimals = 2,
): string => tokenAmountInUnitsToBigNumber(amount, decimals).toFixed(toFixedDecimals)

export const unitsInTokenAmount = (units: unknown, decimals: BigNumber): BigNumber => {
  const decimalsPerToken = new BigNumber(10).pow(decimals)
  return new BigNumber(units as any).multipliedBy(decimalsPerToken)
}

export const tokenAmountInUnitsWithSymbol = (
  units: unknown,
  decimals: BigNumber,
  symbol: string,
): string => `${tokenAmountInUnits(units as any, decimals)} ${symbol?.toLowerCase()}`

export const isAddressValid = (address: string): boolean =>
  validateKeyHash(address) === ValidationResult.VALID

export const fetchOperations = async (
  lastIdParamIn: number,
  limit: number,
): Promise<{ operations: any[]; lastId: number }> => {
  let callUntil = true
  let totalOperations: any[] = []
  let lastIdParam = lastIdParamIn

  while (callUntil) {
    let url = `${BAKING_BAD_API}contract/carthagenet/${TOKEN_CONTRACT_ADDRESS}/operations`
    if (lastIdParam > 0) {
      url = `${BAKING_BAD_API}contract/carthagenet/${TOKEN_CONTRACT_ADDRESS}/operations?last_id=${lastIdParam}`
    }

    // eslint-disable-next-line no-await-in-loop
    const response = await fetch(url)
    // eslint-disable-next-line no-await-in-loop
    const { operations, last_id: lastId } = await response.json()

    // Filter only this actions
    const operationsFiltered = operations.filter((operation: any) =>
      ['transfer', 'mint', 'allow'].includes(operation.entrypoint),
    )
    if (operationsFiltered.length > 0) {
      totalOperations = [...totalOperations, ...operationsFiltered]
    }

    callUntil = operations.length > 0 && lastId && totalOperations.length < limit
    lastIdParam = lastId
  }

  return {
    operations: totalOperations,
    lastId: lastIdParam,
  }
}
