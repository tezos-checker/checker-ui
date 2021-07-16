import { Button, Flex, Heading, HStack } from '@chakra-ui/react'
import { Checker } from '@config'
import { ActionButton } from '@form'
import React, { FunctionComponent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { CheckerOracleTokenInfo } from './checker-oracle-token-info.component'

type Props = {
  checker: Checker
}

export const CheckerCard: FunctionComponent<Props> = ({ checker }) => {
  const history = useHistory()

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
          <Link to={`/checker/${checker.address}/cfmm/actions`}>
            <Button>Buy / Sell</Button>
          </Link>
          <Button>Pool</Button>

          {/* FIXME => disable is user not logged */}
          <ActionButton
            label="Mint"
            onClick={() => history.push(`/checker/${checker.address}/burrows`)}
          />
        </HStack>
      </Flex>
    </Flex>
  )
}
