/* eslint-disable */
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel, InputGroup } from '@chakra-ui/react'
import { addDaysToCurrentDate } from '@shared/utils'
import React, { forwardRef, FunctionComponent } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IFormInputProperties } from 'vdr-react-form-manager'

type Props = IFormInputProperties & {
  onDateChange: (date: Date) => void
}

const minDate = new Date()
minDate.setDate(minDate.getDate() + 1)

export const SellKitDeadlineField: FunctionComponent<Props> = (props) => {
  // eslint-disable-next-line
  // @ts-ignore
  const ButtonDate = forwardRef(({ value, onClick }, ref) => (
    // eslint-disable-next-line
    // @ts-ignore

    <Button variant="solid" onClick={onClick} ref={ref} colorScheme="blue">
      {value}
    </Button>
  ))
  return (
    <FormControl id="deadline" mt="15px">
      <FormLabel>Deadline</FormLabel>
      <InputGroup>
        <DatePicker
          selected={props.value}
          // eslint-disable-next-line
          // @ts-ignore
          onChange={props.onDateChange}
          customInput={<ButtonDate />}
          minDate={addDaysToCurrentDate(1)}
          dateFormat={'dd/MM/yyyy'}
        />
      </InputGroup>
    </FormControl>
  )
}
