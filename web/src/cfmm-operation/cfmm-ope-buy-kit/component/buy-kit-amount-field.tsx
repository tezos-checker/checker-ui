import { useMetaDataViewTokenMetaData } from '@burrow-matadata-operation'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties & {
  inputProps?: InputProps
  address: string
}

export const BuyKitAmountField: FunctionComponent<Props> = ({
  name,
  value,
  inputProps,
  address,
}) => {
  const style = useMultiStyleConfig('ui/form-input-control', {})

  const [{ symbol }] = useMetaDataViewTokenMetaData(address, 0)

  return (
    <FormControl sx={style.formControl} id="amount">
      <FormLabel sx={style.formLabel}>From</FormLabel>
      <InputGroup sx={style.inputGroup}>
        <Input
          sx={style.input}
          name={name}
          value={value}
          type="number"
          placeholder="Amount"
          {...inputProps}
        />
        <Box as="span" sx={style.currency}>
          {symbol}
        </Box>
      </InputGroup>
    </FormControl>
  )
}
