import { Box, VStack } from '@chakra-ui/react'
import { truncateStringInTheMiddle } from '@shared/utils'
import { appNetwork, Checker } from '@wallet'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

export const CheckerMenu: FunctionComponent<{ checker: Checker }> = ({ checker }) => (
  <VStack borderTop="1px" borderBottom="1px" py="5px" w={'100%'}>
    <Box textAlign={'center'} fontWeight="extrabold" width={'100%'}>
      {truncateStringInTheMiddle(checker.address)}
    </Box>
    <Link to={`/checker/${checker.address}/cfmm/buy`}>Buy / Sell</Link>
    <Link to={`/checker/${checker.address}/cfmm/pool`}>Pool</Link>
    <Link to={`/checker/${checker.address}/burrows`}>Burrows</Link>
  </VStack>
)

export const PageMenu: FunctionComponent = () => (
  <VStack>
    <Link to={'/'}>Checkers</Link>
    {appNetwork.checkers.map((x) => (
      <CheckerMenu key={x.address} checker={x} />
    ))}
    <Link to={'/cfmm'}>Cfmm</Link>
  </VStack>
)
