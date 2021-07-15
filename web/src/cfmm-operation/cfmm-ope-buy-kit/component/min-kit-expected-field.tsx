import { Box, FormControl, FormLabel, InputGroup, useMultiStyleConfig } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const MinKitExpectedField: FunctionComponent<Props> = ({ name, value }) => {
  const style = useMultiStyleConfig('ui/form-input-control', {})

  return (
    <FormControl sx={style.formControl} id="amount">
      <FormLabel sx={style.formLabel}>Min kit expected</FormLabel>
      <InputGroup sx={style.inputGroup}>
        <Box flex="1" py="5px">
          {value}
        </Box>
        <Box as="span" sx={style.currency}>
          KIT
        </Box>
      </InputGroup>
    </FormControl>
  )
}
