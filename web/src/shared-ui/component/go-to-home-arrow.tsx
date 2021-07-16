import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { RequestStatus } from '@config'
import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router'

type Props = {
  status: RequestStatus
  loader?: React.ReactElement
}

export const GoToHomeArrow: FunctionComponent = () => {
  const history = useHistory()

  return (
    <Box>
      <IconButton
        onClick={() => history.push('/')}
        my="5px"
        aria-label="back"
        icon={<ArrowBackIcon size="xl" />}
      />
    </Box>
  )
}
