import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

export const NewCheckerTokenField: FunctionComponent = () => (
  <FormControl id="token" mt="15px">
    <FormLabel>Token</FormLabel>
    <Input name="token" placeholder="Token" />
  </FormControl>
)
