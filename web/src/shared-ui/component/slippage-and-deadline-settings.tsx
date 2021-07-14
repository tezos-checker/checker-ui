import { SettingsIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

type Props = {
  splippage: string
  deadLine: string
}

export const SlippageAndDeadLineSetting: FunctionComponent<Props> = ({ splippage, deadLine }) => (
  <Table fontSize="xs">
    <Thead>
      <Tr>
        <Th p="0">Default settings</Th>
        <Th p="0" textAlign="right">
          <Popover>
            <PopoverTrigger>
              <IconButton aria-label="settings" icon={<SettingsIcon />} variant="ghost" />
            </PopoverTrigger>
            <PopoverContent textAlign="start">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Transaction settings!</PopoverHeader>
              <PopoverBody>TBD</PopoverBody>
            </PopoverContent>
          </Popover>
        </Th>
      </Tr>
    </Thead>
    <Tr>
      <Td px="0">Slippage tolerance</Td>
      <Td px="0" textAlign="right">
        {splippage}
      </Td>
    </Tr>
    <Tr>
      <Td px="0">Transaction deadline</Td>
      <Td px="0" textAlign="right">
        {deadLine}
      </Td>
    </Tr>
  </Table>
)
