import { BurrowOpeRowState } from '@burrow-operation'
import { AbstractAction } from '@config'

export type BurrowCreationActionPayload = Pick<
  BurrowOpeRowState,
  'burrowId' | 'scAddress' | 'status' | 'errorMsg'
>

export type BurrowCreationAction = AbstractAction<BurrowCreationActionPayload>
