import { checkerAxios } from '@config'
import { CancelToken } from 'axios'

export const findPostById = (postId: number, axiosCancelToken: CancelToken) =>
  checkerAxios.get(`/posts/${postId || 0}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cancelToken: axiosCancelToken || null,
  })
