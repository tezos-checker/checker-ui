export const addDaysToCurrentDate = (nbDaysToAdd: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() + nbDaysToAdd)
  return date
}
