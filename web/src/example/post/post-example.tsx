import { Box } from '@chakra-ui/react'
import { useAppDispatch } from '@config'
import axios from 'axios'
import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { postActions, postSelectors } from '.'

export const PostExample: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const postList = useSelector(postSelectors.selectAll)

  useEffect(() => {
    dispatch(
      postActions.loadPost({ postId: 1, axiosCancelToken: axios.CancelToken.source().token }),
    )
  }, [])

  console.log(postList)
  return <Box>TO BE DEFINED</Box>
}
