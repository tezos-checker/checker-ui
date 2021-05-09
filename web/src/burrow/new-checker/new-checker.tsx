import { Box } from '@chakra-ui/layout'
import { Button, CloseButton, Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { NewCheckerNameField } from './new-checker-name-field'
import { NewCheckerOracleField } from './new-checker-oracle-field'
import { NewCheckerTokenField } from './new-checker-token-field'

type Props = {
  onCloseChecker: () => void
}

export const NewChecker: FunctionComponent<Props> = ({ onCloseChecker }) => (
  <Box w="500px" mx="auto" mt="15vh" p="20px">
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Box fontSize="3xl">Create checker</Box>
      <CloseButton onClick={onCloseChecker} size="lg" />
    </Flex>
    <NewCheckerNameField />
    <NewCheckerOracleField />
    <NewCheckerTokenField />
    <Button mt="15px">Submit</Button>
  </Box>
)
