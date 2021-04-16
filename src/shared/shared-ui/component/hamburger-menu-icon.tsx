import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import React from 'react'

type Props = {
  isMenuOpen: boolean
}

export const HamburgerMenuIcon = ({ isMenuOpen }: Props) =>
  isMenuOpen ? <CloseIcon /> : <HamburgerIcon />
