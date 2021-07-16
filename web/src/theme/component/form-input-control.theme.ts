import { ThemeComponents } from '@chakra-ui/theme'

const FormInputControlTheme: ThemeComponents = {
  'ui/form-input-control': {
    parts: ['formControl', 'formLabel', 'inputGroup', 'input', 'currency'],
    baseStyle: {
      formControl: {
        mt: '15px',
        bg: 'white',
        border: '1px solid',
        borderColor: 'gray.400',
        borderRadius: 'lg',
        p: '10px',
      },
      formLabel: {
        fontSize: 'xs',
        p: 'unset',
        m: 'unset',
      },
      inputGroup: {
        display: 'flex',
        alignItems: 'center',
      },
      input: {
        mr: '5px',
        px: '0',
        borderTop: 'unset',
        borderLeft: 'unset',
        borderRight: 'unset',
        borderBottom: '1px solid',
        borderRadius: 'unset',
        borderColor: 'gray.200',
      },
      currency: {
        fontSize: 'xx-small',
        p: '3px',
        bg: 'gray.300',
        borderRadius: 'sm',
        minH: '20px',
        maxH: '20px',
        width: '50px',
        maxWidth: '50px',
        minWidth: '50px',
        textAlign: 'center',
      },
    },
  },
}

export default FormInputControlTheme
