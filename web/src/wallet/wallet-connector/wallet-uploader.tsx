import { AddIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { DropZone, useAppToast } from '@shared/ui'
import React, { FunctionComponent } from 'react'
import { activateAccount } from '../../_old_/utils/tool'
import { useConnectedContext } from '../../_old_/state/connected.context'
import { Account } from '../../_old_/utils/types'

const fileTypeAccepted = '.json,application/json'
const WalledUploader: FunctionComponent = () => {
  const { successToast, errorToast } = useAppToast()
  const { setCurrentAccount } = useConnectedContext()
  const fileInput = React.useRef<HTMLInputElement>(null)

  const loadWalletFile = (file: File) => {
    try {
      const reader = new FileReader()

      reader.onload = (event: any) => {
        const account = JSON.parse(event.target.result)

        // Activate account
        activateAccount(account as Account)

        // Set account state
        setCurrentAccount(account as Account)

        successToast('Wallet', 'Wallet load successfully')
      }

      reader.readAsText(file)
    } catch (error) {
      errorToast('Oups', 'An error occured')
    }
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (event: any) => loadWalletFile(event.target.files[0])

  const handleDropFiles = (files: FileList) => {
    const file = Array.from(files)
    if (file.length > 1) {
      errorToast('Wallet file', 'Only one file can be dropped')
      return
    }

    if (file[0].type !== fileTypeAccepted) {
      errorToast('Wallet file', 'Bad file format')
      return
    }

    loadWalletFile(file[0])
  }

  return (
    <DropZone onDropFiles={handleDropFiles} p={'10px'}>
      Drop your wallet or load it
      <IconButton
        size={'lg'}
        icon={<AddIcon />}
        ml={'10px'}
        aria-label={'add-file'}
        onClick={handleClick}
      />
      <input
        type="file"
        accept={fileTypeAccepted}
        onChange={handleFileChange}
        ref={fileInput}
        hidden
      />
    </DropZone>
  )
}

export default WalledUploader
