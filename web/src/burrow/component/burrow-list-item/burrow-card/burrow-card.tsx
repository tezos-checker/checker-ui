import { BurrowOpeRowState, getBurrowOperation, useBurrowOpeDispatcher } from '@burrow-operation'
import { CloseIcon, DragHandleIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  IconButton,
  Image,
  Spinner,
  useDisclosure,
  useStyleConfig,
  VStack,
} from '@chakra-ui/react'
import { RequestStatus } from '@config'
import { ClipboardCopy, SlideBox } from '@shared/ui'
import { truncateStringInTheMiddle } from '@shared/utils'
import { BurrowStorageValues, getBurrowStorage } from '@storage'
import React, { FunctionComponent } from 'react'
import FoxHeadSvg from '../../../../assets/images/fox-head.svg'
import { BurrowRowState } from '../../../state/burrow-state.type'
import { BurrowActionsBox } from '../../burrow-actions-box/burrow-actions-box'

const BurrowOperationInformation: FunctionComponent<BurrowOpeRowState> = (burrowOpe) => {
  const style = useStyleConfig('ui/burrow-operation-info-box')
  const { clearBurrowOpeMessage } = useBurrowOpeDispatcher()

  const { status, operationName } = burrowOpe

  switch (status) {
    case RequestStatus.success:
      return (
        <Flex sx={style} bg="green.100">
          <Box as="span">
            Operation <b>{operationName}</b> succeeded
          </Box>
          <IconButton
            onClick={clearBurrowOpeMessage(burrowOpe)}
            aria-label="close"
            bg="green.500"
            color="green.900"
            size="xs"
            icon={<CloseIcon />}
          />
        </Flex>
      )
    case RequestStatus.pending:
      return (
        <Flex sx={style} position="absolute" bg="blue.200">
          <Box as="span">
            Operation <b>{operationName}</b> is pending
          </Box>
          <Spinner size="xs" />
        </Flex>
      )
    case RequestStatus.error:
      return (
        <Flex sx={style} bg="red.100">
          <Box as="span">
            Operation <b>{operationName}</b> failed
          </Box>
          <IconButton
            onClick={clearBurrowOpeMessage(burrowOpe)}
            aria-label="close"
            bg="red.500"
            color="red.900"
            size="xs"
            icon={<CloseIcon />}
          />
        </Flex>
      )
    default:
      return null
  }
}

export const BurrowCard: FunctionComponent<BurrowRowState> = (props) => {
  const { isOpen, onToggle } = useDisclosure()
  const burrowOperation = getBurrowOperation(props.burrowId)
  const burrowStorage = getBurrowStorage(props.burrowId)

  return (
    <>
      <BurrowStorageValues burrowStorageRow={burrowStorage} />
      <Box border="1px solid" w="300px" m="10px" borderRadius="5px" position="relative">
        <Flex alignItems="center" justifyContent="center" bg="gray.600" color="white" p="5px">
          <Image src={FoxHeadSvg} h={'30px'} />
          <Box as="span" mx="10px">
            {truncateStringInTheMiddle(props.scAddress)}
          </Box>
          <ClipboardCopy text={props.scAddress} />
        </Flex>
        <Box mx="10px" mt="15px" textAlign="center">
          CTEZ / KIT
        </Box>
        {burrowOperation ? <BurrowOperationInformation {...burrowOperation} /> : null}
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
              isLoading={burrowOperation?.status === RequestStatus.pending}
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
        <BurrowActionsBox {...props} onCloseActions={onToggle} />
      </SlideBox>
    </>
  )
}
