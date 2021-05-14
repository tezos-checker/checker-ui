import { ofType } from 'redux-observable'
import { map } from 'rxjs/operators'
import {
  BurrowOpeAction,
  BurrowOpeRowState,
} from '../../../../burrow-operation/state/burrow-ope-state.type'
import { getBurrowCreationAction } from '../../action/burrow-creation.action/burrow-creation-action.util'

export const burrowCreationEpic = (action$: any) =>
  action$.pipe(
    ofType('burrowOpe/createBurrowSubmit', 'burrowOpe/createBurrowConfirm'),
    map((x: BurrowOpeAction) => x.payload),
    map((x: BurrowOpeRowState) =>
      getBurrowCreationAction({
        burrowId: x.burrowId,
        scAddress: x.scAddress,
        status: x.status,
        errorMsg: x.errorMsg,
      }),
    ),
  )
