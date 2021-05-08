import {
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  useMultiStyleConfig,
  useToast,
} from '@chakra-ui/react'
import { store } from '@config'
import { PageBody, PageHeader, PageMenu } from '@pages'
import { HamburgerMenuIcon } from '@shared/ui'
import { useScreenBreakPoint } from '@shared/utils'
import React, { useEffect, useState } from 'react'
import { Unsubscribe } from 'redux'
import { appToastObservable, AppToastType } from './config/toast/app-toast.config'
import './i18n'

const App: React.FC = () => {
  const { isMobOrTabletScreen } = useScreenBreakPoint()
  const [isMenuOpen, setIsMenuOpen] = useState(!isMobOrTabletScreen)
  const style = useMultiStyleConfig('ui/page', { isMenuOpen })
  const toast = useToast()

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
      // save the full state
      //  saveState(store.getState())
      /*  save partial state
      saveState({
        scStorage: store.getState().scStorage,
      })
      */
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
    <Grid sx={style.container}>
      <GridItem sx={style.header}>
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
      </GridItem>
      <GridItem sx={style.body}>
        <Box sx={style.menu}>
          <PageMenu />
        </Box>
        <Flex sx={style.bodyContent}>
          <PageBody />
        </Flex>
      </GridItem>
    </Grid>
  )
}
export default App

/*
<WalletV2 />
<HomePage />
*/
