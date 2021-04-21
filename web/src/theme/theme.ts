import { extendTheme } from '@chakra-ui/react'
import DropZoneTheme from './component/dropZones.theme'
import PageTheme from './page.theme'

const overrides = {
  components: {
    ...PageTheme,
    ...DropZoneTheme,
  },
}

const checkerTheme = extendTheme(overrides)
export default checkerTheme
