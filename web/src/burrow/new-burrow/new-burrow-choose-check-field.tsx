import { Button, FormControl, FormLabel, InputGroup, Select, useDisclosure } from '@chakra-ui/react'
import { SlideBox } from '@shared/ui'
import React, { FunctionComponent } from 'react'
import { NewChecker } from '../new-checker/new-checker'

export const NewBurrowChooseCheckerField: FunctionComponent = () => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <FormControl id="checker" mt="15px">
        <FormLabel>Choose existing checker</FormLabel>
        <InputGroup>
          <Select name="checker" placeholder="Select checker">
            <option>Create checker</option>
          </Select>
          <Button mx="5px" px="5px" minW="150px" onClick={onToggle}>
            Create checker
          </Button>
        </InputGroup>
      </FormControl>
      <SlideBox isOpen={isOpen} onClickOutSideMenu={onToggle}>
        <NewChecker onCloseChecker={onToggle} />
      </SlideBox>
    </>
  )
}
