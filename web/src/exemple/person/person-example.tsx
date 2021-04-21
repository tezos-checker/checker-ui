import React from 'react'
import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { PayloadAction } from '@reduxjs/toolkit'

import { useAppDispatch } from '@config'

import { personActions, personsSelectors } from './state'
import { Person } from './state/person.state'
import { personAdapter } from './state/person.slice'

export function PersonExample() {
  const dispatch = useAppDispatch()
  const personList = useSelector(personsSelectors.selectAll)

  const handleAddPerson = () => {
    const id = `${Math.floor(Math.random() * 100000) + 1}`
    const personPayload: Person = {
      personId: id,
      personName: `name: ${id}`,
      personLastName: `lastname: ${id}`,
    }

    dispatch(personActions.addPerson(personPayload))
  }

  return (
    <Box w={'400px'} m={'10px'} border={'1px solid'} borderColor={'gray.600'}>
      <Box textAlign={'center'}>
        <h1>Persons</h1>
        <Flex padding={'10px'} justifyContent={'space-between'}>
          <Button onClick={handleAddPerson}>add a person</Button>
        </Flex>
        {personList.map(({ personId, personLastName, personName }: Person) => (
          <Box key={personId} my={'15px'} p={'5px'} bg={'gray.300'}>
            <Box>
              {personId} - {personLastName}- {personName}
            </Box>
            <Button onClick={() => dispatch(personActions.deletePerson(personId))}>Remove</Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
