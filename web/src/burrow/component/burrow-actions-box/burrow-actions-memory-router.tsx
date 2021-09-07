import {
  BurrowOpeBurnKitForm,
  BurrowOpeDelegateForm,
  BurrowOpeDepositCollateralForm,
  BurrowOpeLiquidateForm,
  BurrowOpeMintKitForm,
  BurrowOpeRepayForm,
  BurrowOpeWithdrawCollateralForm,
} from '@burrow-operation'
import {
  AddIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  LinkIcon,
  RepeatIcon,
  SunIcon,
} from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { MemoryRouter, NavLink, Route } from 'react-router-dom'
import { BurrowRowState } from 'src/burrow/state/burrow-state.type'

type Props = {
  burrow: BurrowRowState
  onCloseActions: () => void
}

const routesConfig = [
  {
    route: '/deposit',
    label: 'deposit',
    icon: <AddIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: ({ burrow, onCloseActions }: Props) => (
      <BurrowOpeDepositCollateralForm burrow={burrow} callBack={onCloseActions} />
    ),
  },
  {
    route: '/withdraw',
    label: 'withdraw',
    icon: <ArrowRightIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: ({ burrow, onCloseActions }: Props) => (
      <BurrowOpeWithdrawCollateralForm burrow={burrow} callBack={onCloseActions} />
    ),
  },
  {
    route: '/mint',
    label: 'mint',
    icon: <LinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: ({ burrow, onCloseActions }: Props) => (
      <BurrowOpeMintKitForm burrow={burrow} callBack={onCloseActions} />
    ),
  },
  {
    route: '/repay',
    label: 'repay',
    icon: <RepeatIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowOpeRepayForm />,
  },
  {
    route: '/delegate',
    label: 'delegate',
    icon: <SunIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowOpeDelegateForm />,
  },
  {
    route: '/liquidate',
    label: 'liquidate',
    icon: <ExternalLinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => <BurrowOpeLiquidateForm />,
  },

  {
    route: '/burnkit',
    label: 'Burn Kits',
    icon: <LinkIcon height="50px" />,

    // eslint-disable-next-line react/display-name
    getComponent: ({ burrow, onCloseActions }: Props) => (
      <BurrowOpeBurnKitForm burrow={burrow} callBack={onCloseActions} />
    ),
  },
]

export const BurrowOperationsMemoryRouter: FunctionComponent<Props> = (props) => (
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

BurrowOperationsMemoryRouter.displayName = 'BurrowOperationsMemoryRouter'
