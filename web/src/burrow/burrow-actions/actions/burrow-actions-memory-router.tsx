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
import { BurrowActionDelegate } from './burrow-action-delegate'
import { BurrowActionDeposit } from './burrow-action-deposit'
import { BurrowActionEditDepositor } from './burrow-action-edit-depositor'
import { BurrowActionLiquidate } from './burrow-action-liquidate'
import { BurrowActionMint } from './burrow-action-mint'
import { BurrowActionRepay } from './burrow-action-repay'
import { BurrowActionWithdraw } from './burrow-action-withdraw'

const routesConfig = [
  {
    route: '/deposit',
    label: 'deposit',
    component: BurrowActionDeposit,
    icon: <AddIcon height="50px" />,
  },
  {
    route: '/withdraw',
    label: 'withdraw',
    component: BurrowActionWithdraw,
    icon: <ArrowRightIcon height="50px" />,
  },
  { route: '/mint', label: 'mint', component: BurrowActionMint, icon: <LinkIcon height="50px" /> },
  {
    route: '/repay',
    label: 'repay',
    component: BurrowActionRepay,
    icon: <RepeatIcon height="50px" />,
  },
  {
    route: '/delegate',
    label: 'delegate',
    component: BurrowActionDelegate,
    icon: <SunIcon height="50px" />,
  },
  {
    route: '/liquidate',
    label: 'liquidate',
    component: BurrowActionLiquidate,
    icon: <ExternalLinkIcon height="50px" />,
  },
  {
    route: '/editdepositor',
    label: 'edit depositor',
    component: BurrowActionEditDepositor,
    icon: <EditIcon height="50px" />,
  },
]

export const BurrowActionsMemoryRouter: FunctionComponent = () => (
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
      <Route key={x.route} exact path={x.route} component={x.component} />
    ))}
  </MemoryRouter>
)
