import { CfmmOpeBuyKitForm } from '@burrow-operation'
import { Flex, Heading } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { CheckerOracleTokenInfo } from './checker-oracle-token-info.component'

type Props = {
  title: string
  oracle: string
  address: string
}

export const CheckerSelected: FunctionComponent<Props> = ({ title, oracle, address }) => (
  <Flex
    w="350px"
    height="400px"
    m="10px"
    borderRadius="5px"
    position="relative"
    flexDirection="column"
  >
    <Heading as="h3" size="lg" textAlign="center">
      {title}
    </Heading>
    <CheckerOracleTokenInfo oracle={oracle} address={address} />

    <Flex
      border="1px solid"
      alignItems="center"
      justifyContent="center"
      p="10px"
      flexDirection="column"
      mt="15px"
    >
      <CfmmOpeBuyKitForm address={address} />
    </Flex>
  </Flex>
)
