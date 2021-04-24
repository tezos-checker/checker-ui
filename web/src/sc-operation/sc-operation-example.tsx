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
import { useSelector } from 'react-redux'
import { dispatchScIncrement } from './state/op-increment/useDispatchScIncrement'
import { ScOperation } from './state/sc-operation-state.type'
import { scOperationSelectors } from './state/sc-operation.slice'

export const ScOperationExample: FunctionComponent = () => {
  const operationList = useSelector(scOperationSelectors.selectAll)
  const [incrementValue, setIncrementValue] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const [confirmation, setConfirmation] = useState<number>(1)

  return (
    <>
      <Box m={'25px'}>
        <h2>Opérations</h2>
        <HStack>
          <Button onClick={dispatchScIncrement(incrementValue, amount, confirmation)}>
            Increment
          </Button>
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
          ({ id, operationType, operationStatus, status, errorMsg }: ScOperation) => (
            <Box key={id} my={'15px'} p={'5px'} bg={'gray.300'}>
              <Flex>
                <Box flex={0.2}>{id}</Box>
                <Box flex={0.2}>{operationType}</Box>
                <Box flex={0.2}>{operationStatus}</Box>
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
