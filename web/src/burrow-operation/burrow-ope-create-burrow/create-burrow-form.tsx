import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import { Button, IconButton } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormManager } from 'vdr-react-form-manager'
import { CreateBurrowChooseCheckerField } from './component/create-burrow-choose-check-field'
import { CreateBurrowDelegateField } from './component/create-burrow-delegate-field'
import { CreateBurrowDepositField } from './component/create-burrow-deposit-field'
import {
  createBurrowFormModel,
  inputChecker,
  inputDelegate,
  inputDeposit,
} from './component/create-burrow.model'
import { useDispatchBurrowOpeCreateBurrow } from './useDispatchBurrowOpeCreateBurrow'

export const CreateBurrowForm: FunctionComponent = () => {
  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(createBurrowFormModel)

  console.log(isFormValid, 'isFormValid')

  const history = useHistory()

  const { createBurrow } = useDispatchBurrowOpeCreateBurrow(() => history.push('/'))

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
        <CreateBurrowChooseCheckerField {...getInputProps(inputChecker)} />
        <CreateBurrowDelegateField {...getInputProps(inputDelegate)} />
        <CreateBurrowDepositField {...getInputProps(inputDeposit)} />
        <Button
          disabled={!isFormValid}
          mt="15px"
          onClick={() =>
            createBurrow(new Date().getTime(), getInputProps(inputChecker).value, {
              delegate: getInputProps(inputDelegate).value,
              deposit: getInputProps(inputDeposit).value,
            })
          }
        >
          Confirm
        </Button>
      </Box>
    </Box>
  )
}
