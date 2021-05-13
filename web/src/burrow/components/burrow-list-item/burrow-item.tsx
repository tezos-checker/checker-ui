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
import React, { FunctionComponent } from 'react'
import FoxHeadSvg from '../../../assets/images/fox-head.svg'
import { BurrowActions } from '../../burrow-actions/burrow-actions'
import { BurrowRowState } from '../../state/burrow-state.type'
import { useDispatchUpdateBurrow } from '../../state/useDispatchUpdateBurrow'

type Props = BurrowRowState

const BurrowOperationInformation: FunctionComponent<Props> = (props) => {
  const style = useStyleConfig('ui/burrow-operation-info-box')
  const { updateBurrow } = useDispatchUpdateBurrow()

  const { status, operationName } = props.currentOperation

  switch (status) {
    case RequestStatus.error:
      return (
        <Flex sx={style} bg="red.100">
          <Box as="span">
            Operation <b>{operationName}</b> failed
          </Box>
          <IconButton
            onClick={updateBurrow({
              ...props,
              currentOperation: { ...props.currentOperation, status: RequestStatus.idle },
            })}
            aria-label="close"
            bg="red.500"
            color="red.900"
            size="xs"
            icon={<CloseIcon />}
          />
        </Flex>
      )
    case RequestStatus.success:
      return (
        <Flex sx={style} bg="green.100">
          <Box as="span">
            Operation <b>{operationName}</b> succeeded
          </Box>
          <IconButton
            onClick={updateBurrow({
              ...props,
              currentOperation: { ...props.currentOperation, status: RequestStatus.idle },
            })}
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
    default:
      return null
  }
}

export const BurrowItem: FunctionComponent<Props> = (props) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Box border="1px solid" w="300px" m="10px" borderRadius="5px" position="relative">
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
        <BurrowOperationInformation {...props} />
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
              isLoading={props.currentOperation.status === RequestStatus.pending}
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
        <BurrowActions {...props} onCloseActions={onToggle} />
      </SlideBox>
    </>
  )
}
