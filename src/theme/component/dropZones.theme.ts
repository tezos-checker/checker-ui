import { ThemeComponents } from '@chakra-ui/theme'

const DropZoneTheme: ThemeComponents = {
  'ui/drop-zone': {
    baseStyle: ({ isDropZoneOver }) => ({
      bg: isDropZoneOver ? 'gray.200' : 'white',
      border: '1px dashed ',
      borderColor: 'gray.400',
    }),
  },
}

export default DropZoneTheme
