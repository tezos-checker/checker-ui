import { DragHandleIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Image, useDisclosure, VStack } from '@chakra-ui/react'
import { ClipboardCopy, SlideBox } from '@shared/ui'
import { truncateStringInTheMiddle } from '@shared/utils'
import React, { FunctionComponent } from 'react'
import FoxHeadSvg from '../../assets/images/fox-head.svg'
import { BurrowActions } from '../burrow-actions/burrow-actions'

export const BurrowItem: FunctionComponent = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Box border="1px solid" w="300px" m="10px" borderRadius="5px">
        <Flex alignItems="center" justifyContent="center" bg="gray.600" color="white" p="5px">
          <Image src={FoxHeadSvg} h={'30px'} />
          <Box as="span" mx="10px">
            {truncateStringInTheMiddle('testtesttesttesttest')}
          </Box>
          <ClipboardCopy text="testtesttesttesttest" />
        </Flex>
        <Box mx="10px" mt="15px" textAlign="center">
          CTEZ / KIT
        </Box>
        <Box mx="10px" mt="15px" py="5px" textAlign="center" bg="gray.200" borderRadius="10px">
          <Box fontSize="3xl" fontWeight="extrabold">
            100
          </Box>
          <Box fontSize="9px">BURROW BALANCE</Box>
        </Box>
        <Box mx="10px" mt="15px" textAlign="center">
          <Box as="span" mr="10px" fontWeight="extrabold">
            Digger
          </Box>
          {truncateStringInTheMiddle('testtesttesttesttest')}
        </Box>
        <Flex borderTop="1px solid" borderColor="gray.200" mt="15px">
          <VStack flex="1" py="10px">
            <Box fontSize="2xl" fontWeight="extrabold" p="0">
              1
            </Box>

            <Box as="span" fontSize="9px" fontWeight="normal" textAlign="center">
              OUTSTANDING CTEZ
            </Box>
          </VStack>
          <VStack
            py="10px"
            flex="1"
            borderLeft="1px solid"
            borderRight="1px solid"
            borderColor="gray.200"
          >
            <Box fontSize="2xl" fontWeight="extrabold">
              0,00
              <Box as="span" fontSize="12px" fontWeight="normal">
                %
              </Box>
            </Box>
            <Box as="span" fontSize="9px" fontWeight="normal" textAlign="center">
              CURRENT UTILIZATION
            </Box>
          </VStack>
          <VStack flex="1" py="10px">
            <IconButton
              onClick={onToggle}
              aria-label="action"
              variant="ghost"
              icon={<DragHandleIcon size="xl" />}
            />
            <Box as="span" fontSize="9px" fontWeight="normal" textAlign="center">
              ACTION
            </Box>
          </VStack>
        </Flex>
      </Box>
      <SlideBox isOpen={isOpen} onClickOutSideMenu={onToggle}>
        <BurrowActions onCloseActions={onToggle} />
      </SlideBox>
    </>
  )
}
