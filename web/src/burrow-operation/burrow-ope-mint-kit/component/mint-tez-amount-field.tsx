import { Box, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const MintAmountField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="deposit" mt="15px">
    <FormLabel>Amount (in tez)</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
        KIT
      </Box>
      <Input name={name} value={value} type="number" placeholder="Amount (in tez)" />
    </InputGroup>
  </FormControl>
)
