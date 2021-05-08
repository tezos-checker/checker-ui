import { extendTheme } from '@chakra-ui/react'
import DropZoneTheme from './component/dropZones.theme'
import LoginTheme from './component/login.theme'
import PageTheme from './page.theme'

const overrides = {
  components: {
    ...PageTheme,
    ...DropZoneTheme,
    ...LoginTheme,
  },
}

const checkerTheme = extendTheme(overrides)
export default checkerTheme
