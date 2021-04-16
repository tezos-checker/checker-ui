import { Box, Flex, Grid, GridItem, IconButton, useMultiStyleConfig } from '@chakra-ui/react'
import { HamburgerMenuIcon } from '@shared/ui'
import { useScreenBreakPoint } from '@shared/utils'
import React, { useEffect, useState } from 'react'
import './i18n'
import { AppRouterContentMock } from './mock/app-router-content-mock'
import { MenuMock } from './mock/menu-mock'
import HeaderV2 from './pages/header-v2.component'

const App: React.FC = () => {
  const { isMobOrTabletScreen } = useScreenBreakPoint()
  const [isMenuOpen, setIsMenuOpen] = useState(!isMobOrTabletScreen)
  const style = useMultiStyleConfig('ui/page', { isMenuOpen })

  useEffect(() => {
    setIsMenuOpen(!isMobOrTabletScreen)
  }, [isMobOrTabletScreen])

  return (
    <Grid sx={style.container}>
      <GridItem sx={style.header}>
        <HeaderV2>
          {isMobOrTabletScreen ? (
            <IconButton
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              size={'lg'}
              icon={<HamburgerMenuIcon isMenuOpen={isMenuOpen} />}
              aria-label={'menu'}
            />
          ) : null}
        </HeaderV2>
      </GridItem>
      <GridItem sx={style.body}>
        <Box sx={style.menu}>
          <MenuMock />
        </Box>
        <Flex sx={style.bodyContent}>
          <AppRouterContentMock />
        </Flex>
      </GridItem>
      <GridItem sx={style.footer}>FOOTER</GridItem>
    </Grid>
  )
}
export default App

/*
<WalletV2 />
<HomePage />
*/
