import { VirtualizedList } from '@shared/ui'
import React from 'react'

type Person = {
  firstName: string
  lastName: string
}

export const StoreExemplePage = () => {
  const data: Person[] = []
  for (let i = 0; i < 500; i += 1) {
    data.push({ firstName: `firstName ${i}`, lastName: `firstName ${i}` })
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
    ],
    [],
  )

  return <VirtualizedList columns={columns} data={data} tableMargin={'10px'} />
}
