import React, { HTMLAttributes, useState } from 'react'
import Loader from 'react-loader-spinner'
import { Waypoint } from 'react-waypoint'
import useOperations from '../hooks/useOperations.hook'
import useTokenInformation from '../hooks/useTokenInformation.hook'
import TokenService from '../services/tokenContract.service'
import { useConnectedContext } from '../state/connected.context'
import { RemoteData } from '../utils/remote_data'
import OperationItem from './operationItem.component'

const PAGE_SIZE = 10

interface Props extends HTMLAttributes<HTMLDivElement> {
  tokenService: TokenService
}

export const OperationsConnected = (props: Props) => {
  const { tokenService } = props

  const [count, setCount] = useState(PAGE_SIZE)

  const tokenInformation = useTokenInformation(tokenService)

  const { operations, moreOperations } = useOperations(count)

  //  original => const showMore = () => setCount((count) => count + PAGE_SIZE)
  const showMore = () => setCount((countIn) => countIn + PAGE_SIZE)

  const showMoreButton =
    moreOperations && !RemoteData.is.loading(operations) ? (
      <div className="row is-center">
        <button
          className="button primary"
          disabled={RemoteData.is.reloading(operations)}
          onClick={showMore}
        >
          {RemoteData.is.reloading(operations) ? 'Loading...' : 'Show more'}
        </button>
      </div>
    ) : null

  return (
    <div className="col-12 card bg-light" style={{ width: '400px', height: 'auto' }}>
      <header>
        <h4 className="text-center">Operations</h4>
      </header>
      <footer>
        <div className="container">
          {RemoteData.hasData(operations) &&
            operations.data &&
            // eslint-disable-next-line
            //@ts-ignore
            operations.data
              .slice(0, count)
              .map((operation: any, index: number) => (
                <OperationItem
                  key={index}
                  tokenInformation={tokenInformation}
                  operation={operation}
                />
              ))}
          {RemoteData.is.success(operations) && operations.data.length === 0 && (
            <strong>No operations available</strong>
          )}
          {showMoreButton}
        </div>
        {RemoteData.is.loading(operations) ? (
          <div className="is-center">
            <Loader visible={true} type="ThreeDots" color="#14854f" height={80} width={80} />
          </div>
        ) : null}
      </footer>
      {RemoteData.is.success(operations) && <Waypoint onEnter={showMore} />}
    </div>
  )
}

const OperationsDisconnected = () => (
  <div className="col-12 card bg-light" style={{ width: '400px', height: 'auto' }}>
    <header>
      <h4 className="text-center">Operations</h4>
    </header>
    <footer>
      <div className="is-center">
        <Loader visible={true} type="ThreeDots" color="#14854f" height={80} width={80} />
      </div>
    </footer>
  </div>
)

export const Operations = () => {
  const context = useConnectedContext()
  const { tokenService } = context

  return (
    <>
      {tokenService ? (
        <OperationsConnected tokenService={tokenService} />
      ) : (
        <OperationsDisconnected />
      )}
    </>
  )
}
