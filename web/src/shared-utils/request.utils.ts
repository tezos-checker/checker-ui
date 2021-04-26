import { RequestStatus } from '@api'

export const isPendingRequest = (status: RequestStatus) => RequestStatus.pending === status
