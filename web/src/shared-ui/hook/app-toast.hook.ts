import { useToast } from '@chakra-ui/toast'

export const useAppToast = () => {
  const toast = useToast()
  const errorGeneric = 'Oups, error'

  return {
    successToast: (title: string, description: string) => {
      toast({
        title,
        description,
        status: 'success',
        position: 'bottom-right',
      })
    },
    errorToast: (title: string, description: string = errorGeneric) => {
      toast({
        title,
        description,
        status: 'error',
        position: 'bottom',
      })
    },
  }
}
