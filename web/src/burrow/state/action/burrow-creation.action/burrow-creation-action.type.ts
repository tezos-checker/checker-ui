import { BurrowOpeRowState } from '@burrow-operation'
import { AbstractAction } from '@config'

export type CreateBurrowPayload = Pick<BurrowOpeRowState, 'burrowId' | 'scAddress'>

export type CreationBurrowAction = AbstractAction<CreateBurrowPayload>

export type DeleteBurrowAction = AbstractAction<number>
