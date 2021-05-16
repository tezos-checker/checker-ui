import { BurrowOpeRowState } from '@burrow-operation'
import { Box, Flex } from '@chakra-ui/react'
import { StorageBurrowValues, StorageParametersValues } from '@storage'
import React, { FunctionComponent } from 'react'
import { MemoryRouter, NavLink, Route } from 'react-router-dom'
import { BurrowRowState } from 'src/burrow/state/burrow-state.type'
import { StorageRow } from 'src/storage/state/storage-state.type'
import { BurrowCardResume } from './burrow-card-resume/burrow-card-resume'

type Props = {
  burrow: BurrowRowState
  storage?: StorageRow
  burrowOperation?: BurrowOpeRowState
}

const routesConfig = [
  {
    route: '/resume',
    label: 'Resume',

    // eslint-disable-next-line react/display-name
    getComponent: ({ burrow, burrowOperation, storage }: Props) => (
      <BurrowCardResume burrow={burrow} storage={storage} burrowOperation={burrowOperation} />
    ),
  },
  {
    route: '/burrow',
    label: 'Burrow',

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => (
      <StorageBurrowValues storageRow={props.storage} burrowId={props.burrow.burrowId} />
    ),
  },
  {
    route: '/checker',
    label: 'checker',

    // eslint-disable-next-line react/display-name
    getComponent: (props: Props) => (
      <StorageParametersValues storageRow={props.storage} burrowId={props.burrow.burrowId} />
    ),
  },
]

export const CardItemMemoryRouter: FunctionComponent<Props> = (props) => (
  <MemoryRouter initialEntries={routesConfig.map((x) => x.route)} initialIndex={0}>
    <Flex borderBottom="1px solid">
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
            <Box py="10px" fontSize="12px">
              {x.label}
            </Box>
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

CardItemMemoryRouter.displayName = 'CardItemMemoryRouter'
