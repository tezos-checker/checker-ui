import { Box, FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const RemoveLiquidityKitField: FunctionComponent<Props> = ({ name, value }) => (
  <FormControl id="kit" mt="15px">
    <FormLabel>Kit</FormLabel>
    <InputGroup>
      <Box as="span" mt="10px" mr="5px">
        Kit
      </Box>
      <Input name={name} value={value} type="number" placeholder="kit" />
    </InputGroup>
  </FormControl>
)
