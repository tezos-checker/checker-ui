import { AppToastObservable } from 'src/config/app-toast.config'

export const successToast = (title: string, description: string) =>
  AppToastObservable.next({
    type: 'success',
    title,
    description,
  })

export const errorToast = (title: string, description: string) =>
  AppToastObservable.next({
    type: 'error',
    title,
    description,
  })

export const infoToast = (title: string, description: string) =>
  AppToastObservable.next({
    type: 'info',
    title,
    description,
  })

export const warningToast = (title: string, description: string) =>
  AppToastObservable.next({
    type: 'warning',
    title,
    description,
  })
