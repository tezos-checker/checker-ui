import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { NewBurrowChooseCheckerField } from './new-burrow-choose-check-field'
import { NewBurrowDelegateField } from './new-burrow-delegate-field'
import { NewBurrowDepositField } from './new-burrow-deposit-field'

export const NewBurrow: FunctionComponent = () => (
  <Box w="500px" mx="auto" mt="15vh" border="1px solid" borderColor="gray.200" p="20px">
    <Box fontSize="3xl">New Burrow</Box>
    <NewBurrowChooseCheckerField />
    <NewBurrowDelegateField />
    <NewBurrowDepositField />
    <Button mt="15px">Confirm</Button>
  </Box>
)
