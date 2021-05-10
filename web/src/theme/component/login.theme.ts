import { ThemeComponents } from '@chakra-ui/theme'

const LoginTheme: ThemeComponents = {
  'ui/login': {
    parts: ['container', 'button'],
    baseStyle: {
      container: {
        width: ['80vw', '300'],
        maxWidth: ['80vw', '300'],
        mx: 'auto',
        mt: '10vh',
        border: '1px solid #0d61ff',
        textAlign: 'center',
        p: '10',
        borderRadius: '10',
      },
      button: {
        mt: '25',
      },
    },
  },
}

export default LoginTheme
