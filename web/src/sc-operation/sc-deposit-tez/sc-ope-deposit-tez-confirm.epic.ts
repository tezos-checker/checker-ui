import { createConfirmMethodForAction } from '../config/sc-ope-common-confirm.epic'

export const scOpeDepositTezConfirmEpic = createConfirmMethodForAction(
  'operation/depositTezConfirm',
)
