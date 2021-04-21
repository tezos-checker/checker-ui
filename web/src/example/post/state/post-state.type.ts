import { RequestStatus } from '@api'
import { EntityState } from '@reduxjs/toolkit'
import { CancelToken } from 'axios'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type PostState = EntityState<Post> & {
  requestStatus: RequestStatus
  axiosCancelToken: CancelToken
  errorMsg: string
}
