export const truncateStringInTheMiddle = (str: string): string =>
  `${str.substr(0, 4)}...${str.substr(-4)}`

export const mapBytesToString = (bytes: string) => {
  const x = bytes.match(/.{2}/g)?.map((hex) => parseInt(hex, 16))
  return x?.length ? String.fromCharCode(...x) : ''
}
