import {
  Box,
  Button,
  Flex,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import React, { FunctionComponent, useState } from 'react'
import { useDispatchScIncrement } from './sc-ope-increment/useDispatchScOpeIncrement'
import { ScOperationRowState } from './state/sc-ope-state.type'
import { useOperationData } from './state/useScOperationData'

export const ScOperationExample: FunctionComponent = () => {
  const operationList = useOperationData()
  const [incrementValue, setIncrementValue] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const [confirmation, setConfirmation] = useState<number>(1)

  const resetForm = () => {
    setAmount(0)
    setConfirmation(1)
    setIncrementValue(0)
  }

  const scIncrement = useDispatchScIncrement(incrementValue, amount, confirmation, resetForm)

  return (
    <>
      <Box m={'25px'}>
        <h2>Opérations</h2>
        <HStack>
          <Button onClick={scIncrement}>Increment</Button>
        </HStack>

        <HStack>
          <Box>
            Value
            <NumberInput
              value={incrementValue}
              onChange={(value) => setIncrementValue(Number(value))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            Amount
            <NumberInput min={0} value={amount} onChange={(value) => setAmount(Number(value))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            Nb confirmations
            <NumberInput
              min={1}
              max={5}
              value={confirmation}
              onChange={(value) => setConfirmation(Number(value))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </HStack>
      </Box>

      <Box m={'10px'} border={'1px solid'} borderColor={'gray.600'}>
        {operationList.map(
          ({ id, operationName, operationStep, status, errorMsg }: ScOperationRowState) => (
            <Box key={id} my={'15px'} p={'5px'} bg={'gray.300'}>
              <Flex>
                <Box flex={0.2}>{id}</Box>
                <Box flex={0.2}>{operationName}</Box>
                <Box flex={0.2}>{operationStep}</Box>
                <Box flex={0.2}>{status}</Box>
                <Box flex={0.2}>{errorMsg}</Box>
              </Flex>
            </Box>
          ),
        )}
      </Box>
    </>
  )
}
