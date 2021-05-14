import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { burrowSlice } from '../../burrow/state/burrow.slice'
import { burrowCreationEpic } from '../../burrow/state/epic/burrow-creation.epic/burrow-creation.epic'
import { burrowOperationEpic } from '../../burrow/state/epic/burrow-operation.epic/burrow-operation.epic'
import { burrowLoadStorageEpic } from '../../burrow/state/epic/burrow-storage.epic/burrow-load-storage.epic'
import { burrowTriggerLoadStorageEpic } from '../../burrow/state/epic/burrow-storage.epic/burrow-trigger-load-storage.epic'
import { scDeployContractConfirmEpic } from '../../sc-deploy-contract/state/epic/sc-deploy-contract-confirm.epic'
import { scDeployContractSubmitEpic } from '../../sc-deploy-contract/state/epic/sc-deploy-contract-submit.epic'
import { scDeployContractSlice } from '../../sc-deploy-contract/state/sc-deploy-contract.slice'
import { scOpeCreateBurrowConfirmEpic } from '../../sc-operation/sc-create-burrow/sc-ope-create-burrow-confirm.epic'
import { scOpeCreateBurrowSubmitEpic } from '../../sc-operation/sc-create-burrow/sc-ope-create-burrow-submit.epic'
import { scOpeDepositTezConfirmEpic } from '../../sc-operation/sc-deposit-tez/sc-ope-deposit-tez-confirm.epic'
import { scOpeDepositTezSubmitEpic } from '../../sc-operation/sc-deposit-tez/sc-ope-deposit-tez-submit.epic'
import { scOpeSlice } from '../../sc-operation/state/sc-ope.slice'
import { loadWalletEpic } from '../../wallet/state/wallet-epic'
import { walletSlice } from '../../wallet/state/wallet.slice'
import { loadState } from './store-persist.util'

const epicMiddleware = createEpicMiddleware()

const checkerStore = configureStore({
  preloadedState: loadState(),
  reducer: {
    wallet: walletSlice.reducer,
    scOperations: scOpeSlice.reducer,
    scDeployContract: scDeployContractSlice.reducer,
    burrow: burrowSlice.reducer,
  },
  middleware: [epicMiddleware],
})

epicMiddleware.run(
  combineEpics(
    loadWalletEpic,
    scDeployContractSubmitEpic,
    scDeployContractConfirmEpic,

    scOpeCreateBurrowSubmitEpic,
    scOpeCreateBurrowConfirmEpic,
    scOpeDepositTezSubmitEpic,
    scOpeDepositTezConfirmEpic,
    burrowOperationEpic,
    burrowCreationEpic,
    burrowLoadStorageEpic,
    burrowTriggerLoadStorageEpic,
  ),
)

export const store = checkerStore
