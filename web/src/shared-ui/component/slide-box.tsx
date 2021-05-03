import { Box, Flex, Slide } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

type Props = {
  isOpen: boolean
  onClickOutSideMenu: () => void
}

export const SlideBox: FunctionComponent<Props> = ({ isOpen, children, onClickOutSideMenu }) =>
  isOpen ? (
    <Box bg={'rgba(0, 0, 0, 0.1)'} position={'fixed'} top={0} left={0} w={'100vw'} h={'100vh'}>
      <Slide
        direction="right"
        in={isOpen}
        style={{ zIndex: 10 }}
        onAnimationEndCapture={() => alert('sqdsqd')}
      >
        <Flex>
          <Box flex={1} onClick={onClickOutSideMenu}></Box>
          <Box w={'auto'} h={'100vh'} color="white" bg="teal.500">
            {children}
          </Box>
        </Flex>
      </Slide>
    </Box>
  ) : null
