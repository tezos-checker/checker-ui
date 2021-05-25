import { FormControl, FormLabel, Image, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'
import TezosSvg from '../../../assets/images/tez.svg'

type Props = IFormInputProperties

export const BurnKitAmountField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="amoutToBurn" mt="15px">
    <FormLabel>Amount to burn</FormLabel>
    <InputGroup>
      <Image src={TezosSvg} height="35px" bg="gray.200" />
      <Input name={name} value={value} type="number" placeholder="Amount to burn" />
    </InputGroup>
  </FormControl>
)
