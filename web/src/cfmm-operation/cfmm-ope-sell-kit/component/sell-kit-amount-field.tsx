import { Box, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const SellKitAmountField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="amount" mt="15px">
    <FormLabel>Amount</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
        Mukit
      </Box>
      <Input name={name} value={value} type="number" placeholder="Amount" />
    </InputGroup>
  </FormControl>
)
