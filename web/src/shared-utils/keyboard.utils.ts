export const isNumberPressed = (keyCode: number) =>
  keyCode === 8 ||
  keyCode === 46 ||
  (keyCode >= 48 && keyCode <= 57) ||
  (keyCode >= 96 && keyCode <= 105)
