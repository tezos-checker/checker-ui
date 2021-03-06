import { Box, Flex, IconButton, useToast } from '@chakra-ui/react'
import { store } from '@config'
import { PageBody, PageHeader, PageInfo } from '@pages'
import { HamburgerMenuIcon } from '@shared/ui'
import { useScreenBreakPoint } from '@shared/utils'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Unsubscribe } from 'redux'
import { useInitializeStore } from './config/store/initialize-store.hooks'
import { saveState } from './config/store/store-persist.util'
import { appToastObservable, AppToastType } from './config/toast/app-toast.config'
import './i18n'

const App: React.FC = () => {
  const { isMobOrTabletScreen } = useScreenBreakPoint()
  const [isMenuOpen, setIsMenuOpen] = useState(!isMobOrTabletScreen)
  const toast = useToast()
  useInitializeStore(store.getState())

  useEffect(() => {
    appToastObservable.subscribe({
      next: (toastProps: AppToastType) => {
        toast({
          ...toastProps,
          position: 'bottom-right',
        })
      },
    })

    const storeUnsubscribe: Unsubscribe = store.subscribe(() => {
      saveState({
        burrow: store.getState().burrow,
        burrowOperation: store.getState().burrowOperation,
        storage: store.getState().storage,
      })
    })

    return () => {
      appToastObservable.unsubscribe()
      storeUnsubscribe()
    }
  }, [])

  const location = useLocation()
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [location])

  useEffect(() => {
    setIsMenuOpen(!isMobOrTabletScreen)
  }, [isMobOrTabletScreen])

  return (
    <Flex flexDirection={'column'} h={'100%'} maxHeight={'100%'}>
      <PageHeader>
        {isMobOrTabletScreen ? (
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            size={'sm'}
            icon={<HamburgerMenuIcon isMenuOpen={isMenuOpen} />}
            aria-label={'menu'}
          />
        ) : null}
      </PageHeader>
      <PageInfo></PageInfo>
      <Flex flex={1}>
        <Box overflow={'auto'} marginLeft="auto" marginRight="auto">
          <PageBody />
        </Box>
      </Flex>
    </Flex>
  )
}
export default App
