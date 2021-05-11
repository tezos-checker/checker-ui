import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties

export const NewBurrowChooseCheckerField: FunctionComponent<Props> = ({
  name,
  value,
  availableValues,
}) => (
  <FormControl id="checker" mt="15px">
    <FormLabel>Choose existing checker</FormLabel>

    <Select placeholder="Select checker" name={name} value={value}>
      {availableValues.map(({ value: optionValue, label }) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </Select>
  </FormControl>
)
