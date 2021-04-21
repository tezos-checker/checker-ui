import { Box, Flex } from '@chakra-ui/react'
import React, { FunctionComponent, useRef, useState } from 'react'
import { Column, useTable } from 'react-table'
import { FixedSizeList } from 'react-window'

type TableKeyValue = {
  [x: string]: unknown
}

type Props = {
  columns: Column<TableKeyValue>[]
  data: TableKeyValue[]
  tableHeight?: string
  tableMargin?: string
}

export const VirtualizedList: FunctionComponent<Props> = ({
  columns,
  data,
  tableHeight = '100%',
  tableMargin = '0',
}) => {
  // hack in order to set the virtuallist dynamically
  const [listHeight, setListHeight] = useState(-1)
  const tableBodyRef = useRef(null)

  React.useEffect(() => {
    // eslint-disable-next-line
    //@ts-ignore
    const tdBodyHeight = tableBodyRef.current?.clientHeight || 0

    const handleResize = () => {
      // list size has changed
      if (tdBodyHeight !== listHeight) {
        setListHeight(tdBodyHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    //  first rendering of the table
    if (listHeight === -1) {
      setListHeight(tdBodyHeight)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <Flex
          {...row.getRowProps({
            style,
          })}
        >
          {row.cells.map((cell) => {
            const { key, ...rest } = cell.getCellProps()
            return (
              <Box flex={1} key={key} {...rest}>
                {cell.render('Cell')}
              </Box>
            )
          })}
        </Flex>
      )
    },
    [prepareRow, rows],
  )

  // Render the UI for your table
  return (
    <Flex
      flexDirection={'column'}
      height={tableHeight}
      {...getTableProps()}
      m={tableMargin}
      border={'5px solid'}
      borderColor={'red.900'}
      role="table"
    >
      <Box role="thContainer">
        {headerGroups.map((headerGroup) => {
          const { key: headerKey, ...restheader } = headerGroup.getHeaderGroupProps()
          return (
            <Flex
              key={headerKey}
              {...restheader}
              border={'1px solid'}
              borderColor={'gray.500'}
              role="th"
            >
              {headerGroup.headers.map((column) => {
                const { key, ...rest } = column.getHeaderProps()
                return (
                  <Box flex={1} key={key} {...rest} bg={'gray.500'} role="td">
                    {column.render('Header')}
                  </Box>
                )
              })}
            </Flex>
          )
        })}
      </Box>

      <Box ref={tableBodyRef} {...getTableBodyProps()} flex={1} overflow={'hidden'}>
        {listHeight > 0 ? (
          <FixedSizeList height={listHeight} itemCount={data.length} itemSize={50} width={'100%'}>
            {RenderRow}
          </FixedSizeList>
        ) : null}
      </Box>
    </Flex>
  )
}
