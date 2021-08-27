import { CfmmActionsBox, CfmmOpeList } from '@cfmm-operation'
import { Box, useDisclosure } from '@chakra-ui/react'
import { SlideBox } from '@shared/ui'
import React, { FunctionComponent } from 'react'

export const CfmmPage: FunctionComponent = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box display="flex" flexDirection="column" height="85vh" w="90vw">
      <Box display="flex" justifyContent="space-between" alignItems="center" p="2">
        <Box fontSize="2xl">Cfmm</Box>
      </Box>
      <Box flex="1">
        <CfmmOpeList />
      </Box>
      <SlideBox isOpen={isOpen} onClickOutSideMenu={onToggle}>
        <CfmmActionsBox onCloseActions={onToggle} />
      </SlideBox>
    </Box>
  )
}
