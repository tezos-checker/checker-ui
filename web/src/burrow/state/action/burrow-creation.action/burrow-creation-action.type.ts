import { AbstractAction } from '@config'
import { ScOperationRowState } from 'src/sc-operation/state/sc-ope-state.type'

export type BurrowCreationActionPayload = Pick<
  ScOperationRowState,
  'burrowId' | 'scAddress' | 'status' | 'errorMsg'
>

export type BurrowCreationAction = AbstractAction<BurrowCreationActionPayload>
