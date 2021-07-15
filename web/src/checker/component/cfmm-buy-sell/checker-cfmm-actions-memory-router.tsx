import { CfmmOpeBuyKitForm } from '@burrow-operation'
import { HStack } from '@chakra-ui/react'
import { Checker } from '@config'
import React, { FunctionComponent } from 'react'
import { MemoryRouter, NavLink, Route } from 'react-router-dom'

type Props = {
  checker: Checker
}

const routesConfig = [
  {
    route: '/buy',
    label: 'Buy',

    // eslint-disable-next-line react/display-name
    getComponent: ({ checker }: Props) => <CfmmOpeBuyKitForm address={checker.address} />,
  },
  {
    route: '/sell',
    label: 'Sell',

    // eslint-disable-next-line react/display-name
    getComponent: ({ checker }: Props) => <>Sell</>,
  },
  {
    route: '/pool',
    label: 'Poll',

    // eslint-disable-next-line react/display-name
    getComponent: ({ checker }: Props) => <>Poll</>,
  },
]

export const CheckerCfmmActionsMemoryRouter: FunctionComponent<Props> = (props) => (
  <MemoryRouter initialEntries={routesConfig.map((x) => x.route)} initialIndex={0}>
    <HStack justifyContent="space-between" w="100%">
      {routesConfig.map((x) => (
        <NavLink
          key={x.route}
          to={x.route}
          activeStyle={{
            fontWeight: 'bold',
            color: '#0b73c6',
            backgroundColor: '#e2e8f0',

            borderRadius: '15px',
          }}
          style={{ padding: '5px', minWidth: '80px', textAlign: 'center' }}
        >
          {x.label}
        </NavLink>
      ))}
    </HStack>
    {routesConfig.map((x) => (
      // eslint-disable-next-line
      // @ts-ignore
      <Route key={x.route} exact path={x.route} component={() => x.getComponent(props)} />
    ))}
  </MemoryRouter>
)

CheckerCfmmActionsMemoryRouter.displayName = 'CheckerCfmmActionsMemoryRouter'
