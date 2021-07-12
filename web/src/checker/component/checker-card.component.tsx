import { Button, Flex, Heading, HStack } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { CheckerOracleTokenInfo } from './checker-oracle-token-info.component'

type Props = {
  title: string
  title2: string
  oracle: string
  token: string
}

export const CheckerCard: FunctionComponent<Props> = ({ title, title2, oracle, token }) => (
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

    <Flex
      border="1px solid"
      alignItems="center"
      justifyContent="center"
      p="10px"
      flexDirection="column"
      mt="15px"
    >
      <Heading as="h2" size="md" margin="auto">
        {title2}
      </Heading>

      <CheckerOracleTokenInfo oracle={oracle} token={token} />

      <HStack justifyContent="space-between" width="100%">
        <Button>Buy / Sell</Button>
        <Button>Pool</Button>
        <Button>Mint</Button>
      </HStack>
    </Flex>
  </Flex>
)
