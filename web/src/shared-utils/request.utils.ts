import { RequestStatus } from '@config'

export const isPendingRequest = (status: RequestStatus) => RequestStatus.pending === status
