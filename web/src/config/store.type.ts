import { EntityState } from '@reduxjs/toolkit'
import { CounterState } from 'src/example/counter/state/counter.state'
import { Person } from 'src/example/person/state/person.state'
import { EntityPostState } from 'src/example/post/state/post-state.type'
import { EntityOperationState } from 'src/sc-operation/state/sc-ope-state.type'
import { EntityStorageState } from 'src/sc-storage/state/sc-storage.type'
import { EntityWalletState } from 'src/wallet/state/wallet-state.type'

export type CheckerState = {
  counter: CounterState
  persons: EntityState<Person>
  posts: EntityPostState
  wallet: EntityWalletState
  scOperations: EntityOperationState
  scStorage: EntityStorageState
}
