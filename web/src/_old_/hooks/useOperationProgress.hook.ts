import { TezosToolkit } from '@taquito/taquito'
import { useEffect, useState } from 'react'

const useOperationProgress = (taquito: TezosToolkit): number => {
  const [progress, setProgress] = useState<number>(0)
  const [operationTimestamp, setOperationTimestamp] = useState<Maybe<Date>>(null)

  useEffect(() => {
    taquito.rpc.getBlockHeader().then(({ timestamp }) => {
      setOperationTimestamp(new Date(timestamp))
    })
  }, [taquito.rpc])

  useEffect(() => {
    let buffer = 1
    let init = 1
    const step = 0.95
    const interval = setInterval(() => {
      const diff = new Date().getTime() - (operationTimestamp?.getTime() ?? 0)
      const operationProgress = Math.min((diff / 1000 / 30) * 80, 80)
      setProgress(operationProgress + buffer)
      init *= step
      buffer += init
    }, 1000)

    return () => clearInterval(interval)
  }, [operationTimestamp])

  return progress
}

export default useOperationProgress
