import { Box, FormControl, FormLabel, Input, InputGroup, InputProps } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties & {
  inputProps?: InputProps
}

export const BuyKitAmountField: FunctionComponent<Props> = ({ name, value, inputProps }) => (
  <FormControl id="amount" mt="15px">
    <FormLabel>Amount</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
        Tez
      </Box>
      <Input name={name} value={value} type="number" placeholder="Amount" {...inputProps} />
    </InputGroup>
  </FormControl>
)
