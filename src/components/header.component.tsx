import React from 'react'
import { useConnectedContext } from '../state/connected.context'
import Account from './account.component'
import LoadFaucet from './loadFaucet.component'
import NetworkWarning from './networkWarning.component'

const Header = () => {
  const { account } = useConnectedContext()

  return (
    <>
      <nav className="nav">
        <div className="nav-center">
          <NetworkWarning />
        </div>
      </nav>
      <nav className="nav" style={{ marginTop: '30px' }}>
        <div className="nav-left">
          <div className="brand">Starter</div>
          <div className="nav-right">{account ? <Account /> : <LoadFaucet />}</div>
        </div>
      </nav>
    </>
  )
}
export default Header
