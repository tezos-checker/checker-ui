import { createConfirmMethodForAction } from '../config/sc-ope-common-confirm.epic'

export const scOpeCreateBurrowConfirmEpic = createConfirmMethodForAction(
  'operation/createBurrowConfirm',
)
