import { Box, Fade, Flex, Slide } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

type Props = {
  isOpen: boolean
  onClickOutSideMenu: () => void
}

export const SlideBox: FunctionComponent<Props> = ({ isOpen, children, onClickOutSideMenu }) => (
  <>
    <Fade in={isOpen} style={{ zIndex: 9 }} unmountOnExit>
      <Box position={'fixed'} w={'100vw'} h={'100vh'} bg={'rgba(0, 0, 0, 0.1)'} top={0}></Box>
    </Fade>
    <Slide direction="right" in={isOpen} style={{ zIndex: 10 }} unmountOnExit>
      <Flex>
        <Box flex={1} onClick={onClickOutSideMenu} bg={'transparent'}></Box>
        <Box w={'auto'} h={'100vh'} bg="teal.500">
          {children}
        </Box>
      </Flex>
    </Slide>
  </>
)
