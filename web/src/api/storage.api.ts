import { tezos } from '@config'

export const getStorage = async (): Promise<any> => tezos.smartContract.storage()
