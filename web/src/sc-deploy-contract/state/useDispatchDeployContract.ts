import { RequestStatus, ScOperationStep, useAppDispatch } from '@config'
import { scStorageActions } from './sc-deploy-contract.slice'

export const useDispatchDeployContract = () => {
  const dispatch = useAppDispatch()

  return () =>
    dispatch(
      scStorageActions.submit({
        id: new Date().getTime(),
        status: RequestStatus.pending,
        errMsg: '',
        opeStep: ScOperationStep.submit,
        originationWalletOperation: null,
        walletAddress: null,
      }),
    )
}
