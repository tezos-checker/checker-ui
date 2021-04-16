import { ThemeComponents } from '@chakra-ui/theme'

const PageTheme: ThemeComponents = {
  'ui/page': {
    parts: ['container', 'header', 'body', 'menu', 'bodyContent', 'footer'],
    baseStyle: ({ isMenuOpen }) => ({
      container: {
        w: '100%',
        h: '100%',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr auto',
      },
      header: {
        columnSpan: 2,
      },
      body: {
        position: 'relative',
        display: 'flex',
      },
      menu: {
        h: '100%',
        w: { base: '100%', md: 'auto' },
        position: { base: 'absolute', md: 'relative' },
        zIndex: { base: 100, md: 0 },
        bg: 'gray.200',
        display: isMenuOpen ? 'block' : 'none',
      },
      bodyContent: {
        flex: 1,
        flexDirection: 'column',
      },
      footer: {
        columnSpan: 2,
        display: { base: isMenuOpen ? 'none' : 'block', md: 'block' },
      },
    }),
  },
}

export default PageTheme
