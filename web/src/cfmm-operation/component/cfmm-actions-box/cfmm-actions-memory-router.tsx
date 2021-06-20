import {
  CfmmOpeAddLiquidityForm,
  CfmmOpeBuyKitForm,
  CfmmOpeRemoveLiquidityForm
} from '@cfmm-operation'
import { LinkIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { MemoryRouter, NavLink, Route } from 'react-router-dom'

type Props = {
  onCloseActions: () => void
}

const routesConfig = [
  {
    route: '/buykit',
    label: 'Buy Kits',
    icon: <LinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: ({ onCloseActions }: Props) => <CfmmOpeBuyKitForm callBack={onCloseActions} />,
  },
  {
    route: '/sellkit',
    label: 'Sell Kits',
    icon: <LinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: ({ onCloseActions }: Props) => <CfmmOpeSellKitForm callBack={onCloseActions} />,
  },
  {
    route: '/addLiquidity',
    label: 'Add liquidity',
    icon: <LinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: ({ onCloseActions }: Props) => (
      <CfmmOpeAddLiquidityForm callBack={onCloseActions} />
    ),
  },
  {
    route: '/removeLiquidity',
    label: 'Remove liquidity',
    icon: <LinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: ({ onCloseActions }: Props) => (
      <CfmmOpeRemoveLiquidityForm callBack={onCloseActions} />
    ),
  },
]

export const CfmmOperationsMemoryRouter: FunctionComponent<Props> = (props) => (
  <MemoryRouter initialEntries={routesConfig.map((x) => x.route)} initialIndex={0}>
    <Flex h="70px" border="1px solid" my="15px">
      {routesConfig.map((x) => (
        <NavLink
          key={x.route}
          to={x.route}
          activeStyle={{
            fontWeight: 'bold',
            color: '#0b73c6',
            backgroundColor: '#e2e8f0',
          }}
          style={{ flex: 1 }}
        >
          <Flex flexDirection="column" alignItems="center">
            <Box flex="1">{x.icon}</Box>
            <Box fontSize="10px">{x.label}</Box>
          </Flex>
        </NavLink>
      ))}
    </Flex>
    {routesConfig.map((x) => (
      // eslint-disable-next-line
      // @ts-ignore
      <Route key={x.route} exact path={x.route} component={() => x.getComponent(props)} />
    ))}
  </MemoryRouter>
)

CfmmOperationsMemoryRouter.displayName = 'CfmmOperationsMemoryRouter'
