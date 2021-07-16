import { extendTheme } from '@chakra-ui/react'
import BurrowOperationInfoBox from './component/burrowOperationInfoBox.theme'
import DropZoneTheme from './component/dropZones.theme'
import FormInputControlTheme from './component/form-input-control.theme'
import LoginTheme from './component/login.theme'
import PageTheme from './page.theme'

const overrides = {
  components: {
    ...PageTheme,
    ...DropZoneTheme,
    ...LoginTheme,
    ...BurrowOperationInfoBox,
    ...FormInputControlTheme,
  },
}

const checkerTheme = extendTheme(overrides)
export default checkerTheme
