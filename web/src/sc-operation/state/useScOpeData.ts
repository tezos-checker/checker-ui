import { RootState } from '@config'
import { useSelector } from 'react-redux'
import { scOpeAdapter } from './sc-ope.slice'

const scOpeSelectors = scOpeAdapter.getSelectors<RootState>((state) => state.scOperations)
export const useOpeData = () => useSelector(scOpeSelectors.selectAll)
