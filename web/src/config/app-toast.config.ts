import { Subject } from 'rxjs'

export type AppToastType = {
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  description: string
}

export const AppToastObservable = new Subject<AppToastType>()
