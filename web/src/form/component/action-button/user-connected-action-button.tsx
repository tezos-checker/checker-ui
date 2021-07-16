import { Button } from '@chakra-ui/react'
import { ActionButtonProps } from '@form'
import React, { FunctionComponent } from 'react'

export const UserConnectedActionButton: FunctionComponent<ActionButtonProps> = ({
  label,
  onClick,
  ...rest
}) => (
  <Button {...rest} onClick={onClick}>
    {label}
  </Button>
)
