import { Box, Flex, IconButton, useToast } from '@chakra-ui/react'
import { store } from '@config'
import { PageBody, PageHeader } from '@pages'
import { HamburgerMenuIcon } from '@shared/ui'
import { useScreenBreakPoint } from '@shared/utils'
import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    setIsMenuOpen(!isMobOrTabletScreen)
  }, [isMobOrTabletScreen])

  return (
    <Flex flexDirection={'column'} h={'100%'} maxHeight={'100%'}>
      <PageHeader>
        {isMobOrTabletScreen ? (
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            size={'lg'}
            icon={<HamburgerMenuIcon isMenuOpen={isMenuOpen} />}
            aria-label={'menu'}
          />
        ) : null}
      </PageHeader>
      <Box flex={1} overflow={'auto'}>
        <PageBody />
      </Box>
    </Flex>
  )
}
export default App

/*
<WalletV2 />
<HomePage />

<Grid sx={style.container}>
        <GridItem sx={style.header}>
         
        </GridItem>
        <GridItem sx={style.body}>
          <Box sx={style.menu}>
            <PageMenu />
          </Box>
        
        </GridItem>
      </Grid>
*/
