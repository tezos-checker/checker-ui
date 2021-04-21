import { Box, BoxProps } from '@chakra-ui/react'
import { useMultiStyleConfig } from '@chakra-ui/system'
import React, { DragEvent, useState } from 'react'

interface Props extends BoxProps {
  onDropFiles: (Files: FileList) => void
}

export const DropZone: React.FC<Props> = ({ onDropFiles, children, ...rest }) => {
  const [isDropZoneOver, setIsDropZoneOver] = useState(false)
  const style = useMultiStyleConfig('ui/drop-zone', { isDropZoneOver })

  const handleOnDragOver = (event: DragEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setIsDropZoneOver(true)
  }

  const handleOnDragLeave = (event: DragEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setIsDropZoneOver(false)
  }

  const handleOnDrop = (event: DragEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setIsDropZoneOver(false)
    onDropFiles(event.dataTransfer.files || [])
  }

  return (
    <Box
      sx={style}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
      {...rest}
    >
      {children}
    </Box>
  )
}
