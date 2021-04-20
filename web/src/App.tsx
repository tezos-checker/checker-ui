import { Box, Flex, Grid, GridItem, IconButton, useMultiStyleConfig } from '@chakra-ui/react'
import { HamburgerMenuIcon } from '@shared/ui'
import { useScreenBreakPoint } from '@shared/utils'
import React, { useEffect, useState } from 'react'
import './i18n'
import { PageBody, PageHeader, PageMenu } from '@pages'

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
      <GridItem sx={style.footer}>FOOTER</GridItem>
    </Grid>
  )
}
export default App

/*
<WalletV2 />
<HomePage />
*/
