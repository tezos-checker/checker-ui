export const truncateStringInTheMiddle = (str: string): string =>
  `${str.substr(0, 4)}...${str.substr(-4)}`
