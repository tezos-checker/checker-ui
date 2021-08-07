import { Box, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const RemoveLiquidityTokenField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="token" mt="15px">
    <FormLabel>Token</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
        Token
      </Box>
      <Input name={name} value={value} type="number" placeholder="token" />
    </InputGroup>
  </FormControl>
)
