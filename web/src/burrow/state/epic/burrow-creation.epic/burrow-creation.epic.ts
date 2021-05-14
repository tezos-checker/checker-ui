import { ofType } from 'redux-observable'
import { map } from 'rxjs/operators'
import {
  ScOperationAction,
  ScOperationRowState,
} from '../../../../sc-operation/state/sc-ope-state.type'
import { getBurrowCreationAction } from '../../action/burrow-creation.action/burrow-creation-action.util'

export const burrowCreationEpic = (action$: any) =>
  action$.pipe(
    ofType('operation/createBurrowSubmit', 'operation/createBurrowConfirm'),
    map((x: ScOperationAction) => x.payload),
    map((x: ScOperationRowState) =>
      getBurrowCreationAction({
        burrowId: x.burrowId,
        scAddress: x.scAddress,
        status: x.status,
        errorMsg: x.errorMsg,
      }),
    ),
  )
