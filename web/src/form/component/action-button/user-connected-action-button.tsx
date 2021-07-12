import { Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

type Props = {
  label: string
  isDisabled: boolean
  isLoading: boolean
  onClick: () => void
}

export const UserConnectedActionButton: FunctionComponent<Props> = ({
  label,
  isDisabled,
  isLoading,
  onClick,
}) => (
  <Button mt="15px" disabled={isDisabled} isLoading={isLoading} onClick={onClick}>
    {label}
  </Button>
)
