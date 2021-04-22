import { AppToastObservable } from '@config'

export const successToast = (title: string, description: string) =>
  AppToastObservable.next({
    status: 'success',
    title,
    description,
  })

export const errorToast = (title: string, description: string) =>
  AppToastObservable.next({
    status: 'error',
    title,
    description,
  })

export const infoToast = (title: string, description: string) =>
  AppToastObservable.next({
    status: 'info',
    title,
    description,
  })

export const warningToast = (title: string, description: string) =>
  AppToastObservable.next({
    status: 'warning',
    title,
    description,
  })
