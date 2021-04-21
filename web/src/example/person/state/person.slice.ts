import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@config'
import { Person } from './person.state'

export const personAdapter = createEntityAdapter<Person>({
  // Assume IDs are stored in a field other than `person.id`
  selectId: (person) => person.personId,
  // Keep the "all IDs" array sorted based on person last name
  //  sortComparer: (a, b) => a.personId.localeCompare(b.personId),
})

export const personSlice = createSlice({
  name: 'person',
  initialState: personAdapter.getInitialState(),
  reducers: {
    addPerson: personAdapter.addOne,
    deletePerson: personAdapter.removeOne,
  },
})
