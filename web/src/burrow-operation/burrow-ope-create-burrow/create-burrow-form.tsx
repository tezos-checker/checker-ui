import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import { Button, IconButton } from '@chakra-ui/react'
import React, { FunctionComponent, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormManager } from 'vdr-react-form-manager'
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
  // eslint-disable-next-line
  // @ts-ignore
  const { address } = useParams()

  const formModel = useMemo(() => createBurrowFormModel(address), [])

  const {
    handleFormChange,
    getInputProps,
    formProperties: { isFormValid },
  } = useFormManager(formModel)

  const history = useHistory()

  const { createBurrow } = useDispatchBurrowOpeCreateBurrow(() =>
    history.push(`/checker/${address}/burrows`),
  )

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
        <Box>Address {getInputProps(inputChecker).value}</Box>
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
