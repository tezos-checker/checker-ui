import { FormControl, FormLabel, Image, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'
import TezosSvg from '../../../assets/images/tez.svg'

type Props = IFormInputProperties

export const DepositTezAmountField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="deposit" mt="15px">
    <FormLabel>Amount (in tez)</FormLabel>
    <InputGroup>
      <Image src={TezosSvg} mt="10px" height="25px" mr="5px" />
      <Input name={name} value={value} type="number" placeholder="Amount (in tez)" />
    </InputGroup>
  </FormControl>
)
