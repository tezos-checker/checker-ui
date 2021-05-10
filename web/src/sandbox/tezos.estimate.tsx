import { Box, Button } from '@chakra-ui/react'
import { getContract, tezos } from '@config'
import { Estimate } from '@taquito/taquito/dist/types/contract/estimate'
import React, { FunctionComponent, useState } from 'react'

const estimateIncrement = async (): Promise<Estimate> => {
  try {
    const contract = await getContract()
    const op = await contract.methods.increment(10).toTransferParams({})
    return await tezos.estimate.transfer(op)
  } catch (error) {
    return error
  }
}

export const TezosEstimateTest: FunctionComponent = () => {
  const [estimation, setEstimation] = useState({})

  return (
    <Box>
      <h1>Sandox - TezosEstimateTest</h1>
      <Button
        onClick={async () => {
          setEstimation(await estimateIncrement())
        }}
      >
        Test estimate
      </Button>
      <Box>{JSON.stringify(estimation)}</Box>
    </Box>
  )
}
