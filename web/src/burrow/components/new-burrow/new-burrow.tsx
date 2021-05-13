import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import { Button, IconButton } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormManager } from 'vdr-react-form-manager'
import { useDispatchCreateBurrow } from '../../../sc-operation/sc-create-burrow/useDispatchScOpeCreateBurrow'
import { NewBurrowChooseCheckerField } from './new-burrow-choose-check-field'
import { NewBurrowDelegateField } from './new-burrow-delegate-field'
import { NewBurrowDepositField } from './new-burrow-deposit-field'
import { burrowFormModel, inputChecker, inputDelegate, inputDeposit } from './new-burrow.model'

export const NewBurrow: FunctionComponent = () => {
  const { handleFormChange, getInputProps } = useFormManager(burrowFormModel)

  const history = useHistory()

  const { createBurrow } = useDispatchCreateBurrow(() => history.push('/'))

  return (
    <Box w="500px" mx="auto" mt="15vh">
      <IconButton
        onClick={() => history.push('/')}
        my="5px"
        aria-label="back"
        icon={<ArrowBackIcon size="xl" />}
      />
      <Box
        onChange={handleFormChange}
        as="form"
        w="100%"
        border="1px solid"
        borderColor="gray.200"
        p="20px"
      >
        <Box fontSize="3xl">New Burrow</Box>
        <NewBurrowChooseCheckerField {...getInputProps(inputChecker)} />
        <NewBurrowDelegateField {...getInputProps(inputDelegate)} />
        <NewBurrowDepositField {...getInputProps(inputDeposit)} />
        <Button
          mt="15px"
          onClick={createBurrow(`${Math.floor(Math.random() * 99)}_${new Date().getTime()}`)}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  )
}
