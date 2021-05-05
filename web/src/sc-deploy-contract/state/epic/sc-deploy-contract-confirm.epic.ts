import { RequestStatus } from '@api'
import { AbstractAction, ScOperationStep } from '@config'
import { isPendingRequest } from '@shared/utils'
import { ContractAbstraction, Wallet } from '@taquito/taquito'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { scDeployContractConfirm } from '../../config/sc-deploy-contract.api'
import {
  ScDeployContractOperationPayload,
  ScDeployContractRowState,
} from '../sc-deploy-contract.type'

const actionType = 'deployContract/confirm'

const createErrorAction = (
  id: number,
  errMsg: string,
): AbstractAction<ScDeployContractRowState> => ({
  type: actionType,
  payload: {
    id,
    status: RequestStatus.error,
    opeStep: ScOperationStep.confirm,
    wallet: undefined,
    originationWalletOperation: undefined,
    errMsg,
  },
})

const confirmContractRequest = (
  rowState: ScDeployContractRowState,
): Observable<AbstractAction<ScDeployContractRowState>> =>
  from(
    scDeployContractConfirm(
      rowState.originationWalletOperation as ScDeployContractOperationPayload,
    ),
  ).pipe(
    map((res: ContractAbstraction<Wallet>) => {
      if (res) {
        return {
          type: actionType,
          payload: {
            ...rowState,
            opeStep: ScOperationStep.confirmed,
            status: RequestStatus.success,
            wallet: { address: res.address },
          },
        }
      }
      return createErrorAction(rowState.id, 'Internal error')
    }),
    catchError((err) => of(createErrorAction(rowState.id, err.message))),
  )

export const scDeployContractConfirmEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: AbstractAction<ScDeployContractRowState>) => x.payload),
    filter((x: ScDeployContractRowState) => isPendingRequest(x.status)),
    mergeMap((x: ScDeployContractRowState) => confirmContractRequest(x)),
  )
