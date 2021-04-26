import { appToastObservable } from '@config'

export const successToast = (title: string, description: string) =>
  appToastObservable.next({
    status: 'success',
    title,
    description,
  })

export const errorToast = (title: string, description: string) =>
  appToastObservable.next({
    status: 'error',
    title,
    description,
  })

export const infoToast = (title: string, description: string) =>
  appToastObservable.next({
    status: 'info',
    title,
    description,
  })

export const warningToast = (title: string, description: string) =>
  appToastObservable.next({
    status: 'warning',
    title,
    description,
  })
