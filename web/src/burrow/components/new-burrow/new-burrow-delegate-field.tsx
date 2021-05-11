import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties
export const NewBurrowDelegateField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="delegate" mt="15px">
    <FormLabel>Delegation</FormLabel>
    <Input name={name} value={value} placeholder="delegation" />
  </FormControl>
)
