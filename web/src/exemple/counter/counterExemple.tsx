import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '@config'
import React, { useState } from 'react'
import { decrement, increment, incrementByAmount } from './state'

export function CounterExemple() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <Box w={'200px'} m={'10px'} bg={'gray.300'}>
      <Box textAlign={'center'}>
        <h1>CounterExemple: {count}</h1>
      </Box>
      <Flex padding={'10px'} justifyContent={'space-between'}>
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>Add 5</Button>
      </Flex>
    </Box>
  )
}
