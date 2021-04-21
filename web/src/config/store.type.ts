import { EntityState } from '@reduxjs/toolkit'
import { CounterState } from 'src/example/counter/state/counter.state'
import { Person } from 'src/example/person/state/person.state'
import { EntityPostState } from 'src/example/post/state/post-state.type'

export type CheckerState = {
  counter: CounterState
  persons: EntityState<Person>
  posts: EntityPostState
}
