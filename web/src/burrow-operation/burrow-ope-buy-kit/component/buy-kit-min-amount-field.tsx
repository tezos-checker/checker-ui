import { Box, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const BuyKitMinAmountField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="minAmount" mt="15px">
    <FormLabel>Min Amount</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
        KIT
      </Box>
      <Input name={name} value={value} type="number" placeholder="Min Amount" />
    </InputGroup>
  </FormControl>
)
