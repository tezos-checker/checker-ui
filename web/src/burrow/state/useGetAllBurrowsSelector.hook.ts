import { RootState } from '@config'
import { useSelector } from 'react-redux'
import { burrowAdapter } from './burrow.slice'

const burrowSelectors = burrowAdapter.getSelectors<RootState>((state) => state.burrow)
export const useGetAllBurrows = () => useSelector(burrowSelectors.selectAll)
