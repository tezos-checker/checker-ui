import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import { Button, IconButton } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { NewBurrowChooseCheckerField } from './new-burrow-choose-check-field'
import { NewBurrowDelegateField } from './new-burrow-delegate-field'
import { NewBurrowDepositField } from './new-burrow-deposit-field'

export const NewBurrow: FunctionComponent = () => {
  const history = useHistory()
  return (
    <Box w="500px" mx="auto" mt="15vh">
      <IconButton
        onClick={() => history.push('/')}
        my="5px"
        aria-label="back"
        icon={<ArrowBackIcon size="xl" />}
      />
      <Box w="100%" border="1px solid" borderColor="gray.200" p="20px">
        <Box fontSize="3xl">New Burrow</Box>
        <NewBurrowChooseCheckerField />
        <NewBurrowDelegateField />
        <NewBurrowDepositField />
        <Button mt="15px">Confirm</Button>
      </Box>
    </Box>
  )
}
