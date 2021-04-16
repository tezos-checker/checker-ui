import { useBreakpointValue } from '@chakra-ui/react'
import { ScreenBreakPoint } from './ScreenBreakPoint.enum'

export const useScreenBreakPoint = () => {
  const screenSize = useBreakpointValue({
    base: ScreenBreakPoint.mobile,
    sm: ScreenBreakPoint.tablet,
    md: ScreenBreakPoint.screen,
    lg: ScreenBreakPoint.largeScreen,
    xl: ScreenBreakPoint.largeScreen,
  })
  const isMobileScreen = screenSize === ScreenBreakPoint.mobile
  const isTabletScreen = screenSize === ScreenBreakPoint.tablet

  return {
    screenSize,
    isMobileScreen,
    isTabletScreen,
    isMobOrTabletScreen: isMobileScreen || isTabletScreen,
  }
}
