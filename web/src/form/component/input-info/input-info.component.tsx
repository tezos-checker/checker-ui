import { Box, FormControl, FormLabel, InputGroup, useMultiStyleConfig } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { LoadingBox, TextSpinner } from '@shared/ui'
import React, { FunctionComponent } from 'react'

type Props = {
  name: string
  label: string
  value: string
  symbol?: string
  status: RequestStatus
}

export const InputInfo: FunctionComponent<Props> = ({ name, value, symbol, label, status }) => {
  const style = useMultiStyleConfig('ui/form-input-control', {})

  return (
    <LoadingBox status={status} loader={<TextSpinner text={`Calculing ${label}`} />}>
      <FormControl sx={style.formControl} id={name}>
        <FormLabel sx={style.formLabel}>{label}</FormLabel>
        <InputGroup sx={style.inputGroup}>
          <Box flex="1" py="5px">
            {value}
          </Box>
          {symbol ? (
            <Box as="span" sx={style.currency}>
              {symbol}
            </Box>
          ) : null}
        </InputGroup>
      </FormControl>
    </LoadingBox>
  )
}
