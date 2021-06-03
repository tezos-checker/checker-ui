import { Box, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const AddLiquidityMinTokenField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="minToken" mt="15px">
    <FormLabel>Min Token</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
        Min token
      </Box>
      <Input name={name} value={value} type="number" placeholder="Min Token" />
    </InputGroup>
  </FormControl>
)
