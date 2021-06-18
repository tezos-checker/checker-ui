import { Box, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const RemoveLiquidityMinKitField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="minKit" mt="15px">
    <FormLabel>minKit</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
      minKit
      </Box>
      <Input name={name} value={value} type="number" placeholder="minKit" />
    </InputGroup>
  </FormControl>
)
