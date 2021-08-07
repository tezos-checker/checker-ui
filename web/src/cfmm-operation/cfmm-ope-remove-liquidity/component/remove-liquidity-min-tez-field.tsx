import { Box, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const RemoveLiquidityMinTezField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="minTez" mt="15px">
    <FormLabel>minTez</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
        minTez
      </Box>
      <Input name={name} value={value} type="number" placeholder="minTez" />
    </InputGroup>
  </FormControl>
)
