import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

export const NewBurrowDelegateField: FunctionComponent = () => (
  <FormControl id="delegate" mt="15px">
    <FormLabel>Delegation</FormLabel>
    <Input name="delegate" placeholder="delegation" />
  </FormControl>
)
