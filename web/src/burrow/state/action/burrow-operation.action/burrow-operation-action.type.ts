import { AbstractAction } from '@config'
import { ScOperationRowState } from 'src/sc-operation/state/sc-ope-state.type'
import { BurrowOperation } from '../../burrow-state.type'

export type BurrowOperationActionPayload = BurrowOperation &
  Pick<ScOperationRowState, 'burrowId' | 'scAddress'>

export type BurrowOperationAction = AbstractAction<BurrowOperationActionPayload>
