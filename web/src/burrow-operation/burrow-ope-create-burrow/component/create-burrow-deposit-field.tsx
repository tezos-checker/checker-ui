import { FormControl, FormLabel, Image, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'
import TezosSvg from '../../../assets/images/tez.svg'

type Props = IFormInputProperties

export const CreateBurrowDepositField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="deposit" mt="15px">
    <FormLabel>Initial deposit (in tez)</FormLabel>
    <InputGroup>
      <Image src={TezosSvg} height="35px" bg="gray.200" />
      <Input name={name} value={value} type="number" placeholder="Initial deposit (in tez)" />
    </InputGroup>
  </FormControl>
)
