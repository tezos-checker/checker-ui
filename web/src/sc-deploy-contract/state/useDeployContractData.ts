import { RootState } from '@config'
import { useSelector } from 'react-redux'
import { scDeployContractAdapter } from './sc-deploy-contract.slice'

const scDeployContractSelectors = scDeployContractAdapter.getSelectors<RootState>(
  (state) => state.scDeployContract,
)
export const useDeployContractData = () => useSelector(scDeployContractSelectors.selectAll)
