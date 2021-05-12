import {
  AddIcon,
  ArrowRightIcon,
  EditIcon,
  ExternalLinkIcon,
  LinkIcon,
  RepeatIcon,
  SunIcon,
} from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { MemoryRouter, NavLink, Route } from 'react-router-dom'
import { BurrowRowState } from 'src/burrow/state/burrow-state.type'
import { BurrowActionDelegate } from './burrow-action-delegate'
import { BurrowActionDepositTez } from './burrow-action-deposit-tez'
import { BurrowActionEditDepositor } from './burrow-action-edit-depositor'
import { BurrowActionLiquidate } from './burrow-action-liquidate'
import { BurrowActionMint } from './burrow-action-mint'
import { BurrowActionRepay } from './burrow-action-repay'
import { BurrowActionWithdraw } from './burrow-action-withdraw'

type Props = BurrowRowState & {
  onCloseActions: () => void
}

const routesConfig = [
  {
    route: '/deposit',
    label: 'deposit',
    icon: <AddIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => (
      <BurrowActionDepositTez {...props} callBack={props.onCloseActions} />
    ),
  },
  {
    route: '/withdraw',
    label: 'withdraw',
    icon: <ArrowRightIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowActionWithdraw />,
  },
  {
    route: '/mint',
    label: 'mint',
    icon: <LinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowActionMint />,
  },
  {
    route: '/repay',
    label: 'repay',
    icon: <RepeatIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowActionRepay />,
  },
  {
    route: '/delegate',
    label: 'delegate',
    icon: <SunIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowActionDelegate />,
  },
  {
    route: '/liquidate',
    label: 'liquidate',
    icon: <ExternalLinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowActionLiquidate />,
  },
  {
    route: '/editdepositor',
    label: 'edit depositor',
    icon: <EditIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowActionEditDepositor />,
  },
]

export const BurrowActionsMemoryRouter: FunctionComponent<Props> = (props) => (
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

BurrowActionsMemoryRouter.displayName = 'BurrowActionsMemoryRouter'
