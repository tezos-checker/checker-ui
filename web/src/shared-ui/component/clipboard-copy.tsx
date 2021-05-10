import { Button, Image } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import CopyPng from '../../assets/images/copy.png'
import { errorToast, infoToast } from '../utils/toast.utils'

type Props = {
  text: string
}

export const ClipboardCopy: FunctionComponent<Props> = ({ text }) => {
  const copyTextToClipboard = () =>
    navigator.clipboard
      .writeText(text)
      .then((x) => infoToast('Clipboard', 'Copied to clipboard'))
      .catch((err) => errorToast('Clipboard', 'Copy to clipboard failed'))

  return (
    <Button onClick={() => copyTextToClipboard()} p={0}>
      <Image src={CopyPng} height={'50%'} />
    </Button>
  )
}
