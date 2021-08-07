import { useSelector } from 'react-redux'
import { getCfmmOperationList } from '../../state/cfmm-ope.slice'

export const useGetCfmmOperationList = () => useSelector((state) => getCfmmOperationList(state))
