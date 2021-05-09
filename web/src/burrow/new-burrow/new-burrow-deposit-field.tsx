import { FormControl, FormLabel, Image, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import TezosSvg from '../../assets/images/tez.svg'

export const NewBurrowDepositField: FunctionComponent = () => (
  <FormControl id="deposit" mt="15px">
    <FormLabel>Initial deposit (in tez)</FormLabel>
    <InputGroup>
      <Image src={TezosSvg} height="35px" bg="gray.200" />
      <Input name="deposit" placeholder="Initial deposit (in tez)" />
    </InputGroup>
  </FormControl>
)
