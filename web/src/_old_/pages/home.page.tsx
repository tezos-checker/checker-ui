import React from 'react'
import { ToastProvider } from 'react-toast-notifications'
import ContractActions from '../components/contractActions'
import ContractBalance from '../components/contractBalance'
import DisclaimerWarning from '../components/disclaimerWarning.component'
import Header from '../components/header.component'
import { Operations } from '../components/operations.component'

const HomePage = () => (
  <>
    <ToastProvider>
      <Header />
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="row">
          <div className="col-6 is-right">
            <ContractBalance />
          </div>
          <div className="col-6">
            <ContractActions />
          </div>
        </div>
        <div className="row" style={{ marginTop: '30px' }}>
          <Operations />
        </div>
      </div>
      <div className="nav-center disclaimer">
        <DisclaimerWarning />
      </div>
    </ToastProvider>
  </>
)

export default HomePage
