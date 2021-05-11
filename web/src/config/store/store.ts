import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { scDeployContractConfirmEpic } from '../../sc-deploy-contract/state/epic/sc-deploy-contract-confirm.epic'
import { scDeployContractSubmitEpic } from '../../sc-deploy-contract/state/epic/sc-deploy-contract-submit.epic'
import { scDeployContractSlice } from '../../sc-deploy-contract/state/sc-deploy-contract.slice'
import { scOpeIncrementConfirmEpic } from '../../sc-operation/sc-ope-increment/sc-ope-increment-confirm.epic'
import { scOpeIncrementSubmitEpic } from '../../sc-operation/sc-ope-increment/sc-ope-increment-submit.epic'
import { scOpeSlice } from '../../sc-operation/state/sc-ope.slice'
import { loadStorageEpic } from '../../sc-storage/state/sc-storage.epic'
import { scStorageSlice } from '../../sc-storage/state/sc-storage.slice'
import { loadWalletEpic } from '../../wallet/state/wallet-epic'
import { walletSlice } from '../../wallet/state/wallet.slice'
import { loadState } from './store-persist.util'

const epicMiddleware = createEpicMiddleware()

const checkerStore = configureStore({
  preloadedState: loadState(),
  reducer: {
    wallet: walletSlice.reducer,
    scOperations: scOpeSlice.reducer,
    scStorage: scStorageSlice.reducer,
    scDeployContract: scDeployContractSlice.reducer,
  },
  middleware: [epicMiddleware],
})

epicMiddleware.run(
  combineEpics(
    loadWalletEpic,
    loadStorageEpic,
    scDeployContractSubmitEpic,
    scDeployContractConfirmEpic,
    scOpeIncrementSubmitEpic,
    scOpeIncrementConfirmEpic,
  ),
)

export const store = checkerStore