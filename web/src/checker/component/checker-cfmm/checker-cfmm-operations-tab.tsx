import {
  CfmmOpeAddLiquidityForm,
  CfmmRemoveLiquidityForm,
  SwapOpeBuyForm,
  SwapOpeSellForm,
} from '@cfmm-operation'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Checker } from '@wallet'
import React, { FunctionComponent } from 'react'

type Props = {
  checker: Checker
}

export const CheckerCfmmOperationsTab: FunctionComponent<Props> = ({ checker }) => {
  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <Tabs isLazy colorScheme="blue" index={tabIndex} onChange={setTabIndex} p="0" m="0" w="100%">
      <TabList justifyContent="space-between" borderBottom="unset">
        <Tab>Buy</Tab>
        <Tab>Sell</Tab>
        <Tab>Add Liquidity</Tab>
        <Tab>Remove Liquidity</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SwapOpeBuyForm checker={checker} onClickSwitch={setTabIndex} />
        </TabPanel>
        <TabPanel>
          <SwapOpeSellForm checker={checker} onClickSwitch={setTabIndex} />
        </TabPanel>
        <TabPanel>
          <CfmmOpeAddLiquidityForm checker={checker} />
        </TabPanel>
        <TabPanel>
          <CfmmRemoveLiquidityForm checker={checker} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
