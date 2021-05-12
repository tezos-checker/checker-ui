import { AbstractAction } from '@config'
import { ofType } from 'redux-observable'
import { map } from 'rxjs/operators'
import { ScOperationAction, ScOperationRowState } from '../../sc-operation/state/sc-ope-state.type'
import { BurrowRowState } from './burrow-state.type'

const createAction = ({
  burrowId,
  status,
  operationName,
  blockResponse,
  errorMsg,
}: ScOperationRowState): AbstractAction<BurrowRowState> => ({
  type: 'burrow/updateBurrow',
  payload: {
    burrowId,
    status,
    operationName,
    blockResponse,
    errorMsg,
  },
})

export const burrowEpic = (action$: any) =>
  action$.pipe(
    ofType(
      'operation/createBurrowSubmit',
      'operation/createBurrowConfirm',
      'operation/depositTezSubmit',
      'operation/depositTezConfirm',
    ),
    map((x: ScOperationAction) => x.payload),
    map((x: ScOperationRowState) => createAction(x)),
  )
