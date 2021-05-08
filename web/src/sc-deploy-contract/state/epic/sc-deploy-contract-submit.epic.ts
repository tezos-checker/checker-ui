import { AbstractAction, RequestStatus, ScOperationStep } from '@config'
import { isPendingRequest } from '@shared/utils'
import { OriginationWalletOperation } from '@taquito/taquito'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { scDeployContractSubmit } from '../../config/sc-deploy-contract.api'
import { ScDeployContractRowState } from '../sc-deploy-contract.type'

const actionType = 'deployContract/submit'

const createErrorAction = (
  id: number,
  errMsg: string,
): AbstractAction<ScDeployContractRowState> => ({
  type: actionType,
  payload: {
    id,
    status: RequestStatus.error,
    opeStep: ScOperationStep.submit,
    walletAddress: null,
    originationWalletOperation: null,
    errMsg,
  },
})

const submitContractRequest = (
  rowState: ScDeployContractRowState,
): Observable<AbstractAction<ScDeployContractRowState>> =>
  from(scDeployContractSubmit()).pipe(
    map((res: OriginationWalletOperation) => {
      if (res) {
        // eslint-disable-next-line
        return {
          type: 'deployContract/confirm',
          payload: {
            ...rowState,
            opeStep: ScOperationStep.confirm,
            originationWalletOperation: res,
          },
        }
      }
      return createErrorAction(rowState.id, 'Internal error')
    }),
    catchError((err) => of(createErrorAction(rowState.id, err.message))),
  )

export const scDeployContractSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: AbstractAction<ScDeployContractRowState>) => x.payload),
    filter((x: ScDeployContractRowState) => isPendingRequest(x.status)),
    mergeMap((x: ScDeployContractRowState) => submitContractRequest(x)),
  )
