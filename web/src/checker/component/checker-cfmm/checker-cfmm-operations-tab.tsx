import {
  CfmmOpeAddLiquidityForm,
  CfmmRemoveLiquidityForm,
  SwapOpeBuyForm,
  SwapOpeSellForm,
} from '@cfmm-operation'
import { Box, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Checker } from '@wallet'
import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

type Props = {
  checker: Checker
}

enum TabViewEnum {
  buy = 0,
  sell = 1,
  addLiquidity = 2,
  removeLiquidity = 3,
}

type TabItemProps = {
  label: string
  tabIndex: TabViewEnum
}

const TabItem: FunctionComponent<{
  isSelected: boolean
  left: TabItemProps
  right: TabItemProps
  setTabIndex: (tabIndex: number) => void
  currentTabIndex: number
}> = ({ setTabIndex, currentTabIndex, left, right, isSelected }) => (
  <Box
    w="110px"
    textAlign="center"
    fontSize="small"
    bgColor={isSelected ? 'blue.400' : 'gray.400'}
    p="5px 10px"
    borderRadius="15px"
    _hover={{ bgColor: isSelected ? 'blue.600' : 'gray.500', cursor: 'pointer' }}
    onClick={() => {
      if (currentTabIndex === left.tabIndex) {
        setTabIndex(right.tabIndex)
        return
      }

      if (currentTabIndex === right.tabIndex) {
        setTabIndex(left.tabIndex)
        return
      }

      setTabIndex(left.tabIndex)
    }}
  >
    <Box as="span" fontWeight={currentTabIndex === left.tabIndex ? 'bold' : 'normal'}>
      {left.label}
    </Box>
    <Box as="span" display="inline-block" margin="0 5px">
      /
    </Box>
    <Box as="span" fontWeight={currentTabIndex === right.tabIndex ? 'bold' : 'normal'}>
      {right.label}
    </Box>
  </Box>
)

export const CheckerCfmmOperationsTab: FunctionComponent<Props> = ({ checker }) => {
  // eslint-disable-next-line
  // @ts-ignore
  const { cfmmAction } = useParams()

  const [tabIndex, setTabIndex] = React.useState(cfmmAction === 'buy' ? 0 : 2)

  return (
    <Tabs isLazy colorScheme="blue" index={tabIndex} p="0" m="0" w="100%">
      <Box display="flex" justifyContent="space-between">
        <TabItem
          isSelected={tabIndex <= 1}
          left={{
            label: 'Buy',
            tabIndex: TabViewEnum.buy,
          }}
          right={{
            label: 'Sell',
            tabIndex: TabViewEnum.sell,
          }}
          setTabIndex={setTabIndex}
          currentTabIndex={tabIndex}
        />
        <TabItem
          isSelected={tabIndex >= 2}
          left={{
            label: 'Add',
            tabIndex: TabViewEnum.addLiquidity,
          }}
          right={{
            label: 'Remove',
            tabIndex: TabViewEnum.removeLiquidity,
          }}
          setTabIndex={setTabIndex}
          currentTabIndex={tabIndex}
        />
      </Box>
      <Box textAlign="end" fontSize="x-small">
        <Box as="span" w="110px" display="inline-block" textAlign="center">
          Liquidity
        </Box>
      </Box>
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
