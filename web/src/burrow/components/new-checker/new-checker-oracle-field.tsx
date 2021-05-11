import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

export const NewCheckerOracleField: FunctionComponent = () => (
  <FormControl id="oracle" mt="15px">
    <FormLabel>Oracle</FormLabel>
    <Input name="oracle" placeholder="Oracle" />
  </FormControl>
)
