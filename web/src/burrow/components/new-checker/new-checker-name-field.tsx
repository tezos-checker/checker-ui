import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

export const NewCheckerNameField: FunctionComponent = () => (
  <FormControl id="checkerName" mt="15px">
    <FormLabel>Checker name</FormLabel>
    <Input name="checkerName" placeholder="Checker name" />
  </FormControl>
)
