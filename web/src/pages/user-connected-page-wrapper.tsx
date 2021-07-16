import { Login } from '@auth'
import { useGetWallet } from '@wallet'
import React, { FunctionComponent } from 'react'

export const UserConnectedPageWrapper: FunctionComponent = (props) => {
  const { address } = useGetWallet()

  return address && address !== '' ? <>{props.children}</> : <Login />
}
