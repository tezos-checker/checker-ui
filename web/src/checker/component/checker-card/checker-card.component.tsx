import {
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Checker } from '@wallet'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { CheckerOracleTokenInfo } from './checker-oracle-token-info.component'

type Props = {
  checker: Checker
}

export const CheckerCard: FunctionComponent<Props> = ({ checker }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex
      w="350px"
      height="400px"
      m="10px"
      borderRadius="5px"
      position="relative"
      flexDirection="column"
    >
      <Heading as="h3" size="lg" textAlign="center">
        {checker.name}
      </Heading>

      <Flex
        border="1px solid"
        alignItems="center"
        justifyContent="center"
        p="10px"
        flexDirection="column"
        mt="15px"
      >
        <Heading as="h2" size="md" margin="auto">
          {checker.swapTitle}
        </Heading>

        <CheckerOracleTokenInfo oracle={checker.oracle} address={checker.address} />

        <HStack justifyContent="space-between" width="100%">
          <Link to={`/checker/${checker.address}/cfmm`}>
            <Button>Buy / Sell</Button>
          </Link>
          <Link to={`/checker/${checker.address}/cfmm`}>
            <Button>Pool</Button>
          </Link>
          <>
            <Button onClick={onOpen}>Burrows</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Advanced Users</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={3}>
                    <Text fontSize="lg">
                      You are entering a section which requires some experience and knowledge about
                      burrow, liquidation and other advanced feature that a burrow offers.
                    </Text>
                    <Text fontSize="lg">
                      By clicking continue on advanced mode you acknowledge that you know all the
                      rules and you agree with it.
                    </Text>
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Link to={`/checker/${checker.address}/burrows`}>
                    <Button colorScheme="blue" mr={3}>
                      Burrows
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </HStack>
      </Flex>
    </Flex>
  )
}
