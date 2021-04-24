import { RequestStatus } from '@api'
import { Box, Button, Spinner } from '@chakra-ui/react'
import { useAppDispatch } from '@config'
import axios from 'axios'
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { postActions, postSelectors } from '.'
import { postRequestStatusSelector } from './state/post/post-selector'

export const PostExample: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const postList = useSelector(postSelectors.selectAll)
  const { status, errorMsg } = useSelector(postRequestStatusSelector)

  const getPostBox = () => {
    switch (status) {
      case RequestStatus.pending:
        return <Spinner />
      case RequestStatus.error:
        return <Box>Oups, {errorMsg}</Box>
      default:
        return postList.length ? (
          <Box>
            {postList[0].id} <br />
            {postList[0].title}
          </Box>
        ) : (
          <Box>No post</Box>
        )
    }
  }

  return (
    <Box m={'10px'} p={'10px'} border={'1px solid'} borderColor={'gray.600'}>
      <Box>
        <Button
          onClick={() =>
            dispatch(
              postActions.loadPost({
                postId: 1,
                axiosCancelToken: axios.CancelToken.source().token,
              }),
            )
          }
        >
          Load post
        </Button>
      </Box>
      {getPostBox()}
    </Box>
  )
}
