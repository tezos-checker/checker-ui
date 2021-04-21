import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { fetchPostEpic } from '../example/post/state/epic/post-epic'

export const epicMiddleware = createEpicMiddleware()
const rootEpic = combineEpics(fetchPostEpic)
epicMiddleware.run(rootEpic)
