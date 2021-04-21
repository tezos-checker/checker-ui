import { findPostById } from '@api'
import { AxiosError } from 'axios'
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { Post } from '../post-state.type'
import { LoadPostAction, LoadPostErrorAction, LoadPostSuccessAction } from '../reducer/post-reducer'

export const fetchPostRequest = (data: LoadPostAction) =>
  from(findPostById(data.payload.postId, data.payload.axiosCancelToken)).pipe(
    map((res: any) => {
      if (res && res.data) {
        return {
          type: 'post/loadPostSuccess',
          payload: res.data as Post,
        } as LoadPostSuccessAction
      }
      return {
        type: 'post/loadPostError',
        payload: 'something went wrong',
      } as LoadPostErrorAction
    }),
    catchError((err: AxiosError) =>
      of({
        type: 'post/loadPostError',
        payload: err.message,
      } as LoadPostErrorAction),
    ),
  )

export const fetchPostEpic = (action$: any, state$: any) =>
  action$.pipe(
    ofType('post/loadPost'),
    mergeMap((action: LoadPostAction) => fetchPostRequest(action)),
    catchError((e) =>
      of({
        type: 'post/loadPostError',
        payload: e.message,
      } as LoadPostErrorAction),
    ),
  )
