import BigNumber from 'bignumber.js'
import React from 'react'
import useGasEstimation from '../hooks/useGasEstimation.hook'
import TokenService from '../services/tokenContract.service'
import { Action } from '../utils/types'
import { IconType, Tooltip } from './tooltip/tooltip.component'

interface Props {
  amount: Maybe<BigNumber>
  addressFrom?: string
  addressTo?: string
  action: Action
  tokenService: TokenService
}

const GasEstimation = (props: Props) => {
  const { amount, addressFrom = null, addressTo = null, action, tokenService } = props
  const metadata = {
    amount,
    addressFrom,
    addressTo,
  }
  const gasEstimation = useGasEstimation(action, metadata, tokenService)

  let descriptionGasEstimation = `Gas limit: 0<br/>Storage limit: 0<br/>Suggested fee: 0`
  if (gasEstimation) {
    descriptionGasEstimation = `Gas limit: ${gasEstimation.gasLimit} gas units<br/> 
        Storage limit: ${gasEstimation.storageLimit}<br/>  
        Suggested fee: ${gasEstimation.suggestedFeeMutez} mutez`
  }

  return (
    <Tooltip id="gasEstimation" description={descriptionGasEstimation} iconType={IconType.Fuel} />
  )
}

export default GasEstimation
