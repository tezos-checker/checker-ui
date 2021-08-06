import { VirtualizedList } from '@shared/ui'
import React, { FunctionComponent } from 'react'
import { useGetCfmmOperationList } from './useGetCfmmOperationList.hook'

export const CfmmOpeList: FunctionComponent = () => {
  const cfmmList = useGetCfmmOperationList()

  const columns = React.useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Checker',
        accessor: 'scAddress',
      },
      {
        Header: 'Operation name',
        accessor: 'operationName',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Error',
        accessor: 'errorMsg',
      },
    ],
    [],
  )

  return <VirtualizedList columns={columns} data={cfmmList} tableMargin={'10px'} />
}
