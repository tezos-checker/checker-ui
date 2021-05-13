import { ofType } from 'redux-observable'
import { map } from 'rxjs/operators'
import {
  ScOperationAction,
  ScOperationRowState,
} from '../../../../sc-operation/state/sc-ope-state.type'
import { getUpdateBurrowOperationAction } from '../../action/burrow-operation.action/burrow-operation-action.util'

// update the burrow operation state //
export const burrowOperationEpic = (action$: any) =>
  action$.pipe(
    ofType(
      'operation/createBurrowSubmit',
      'operation/createBurrowConfirm',
      'operation/depositTezSubmit',
      'operation/depositTezConfirm',
    ),
    map((x: ScOperationAction) => x.payload),
    map((x: ScOperationRowState) => getUpdateBurrowOperationAction(x)),
  )
