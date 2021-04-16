import React from 'react'
import AssetTezLogo from '../assets/images/tezos.png'

export const AssetTezImage = () => (
  <div className="is-vertical-align">
    <img style={{ borderRadius: '4px' }} src={AssetTezLogo} alt="icon" />
    &nbsp;Tez
  </div>
)
