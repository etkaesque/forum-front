import { create } from 'zustand'
import { notificationType } from '@/types'

export const useStore = create<{
  notification: notificationType,
  authentication: boolean,
  loader: boolean,
  update: boolean,
  modal: boolean,
  form: string,
  setAuthentication: (value : boolean) => void,
  setNotification: (value : notificationType) => void,
  setLoader: (value : boolean) => void,
  setForm: (value : string) => void,
  setModal: () => void
  setUpdate: () => void

}>((set, get) => ({
  notification: {success: false, message: "", display: false},
  authentication: false,
  update: false,
  loader: false,
  modal: false,
  form: 'login',
  setForm: (form :string) => set(() => ({ form: form })),
  setLoader: (value : boolean) => set(() => ({ loader: value })),
  setAuthentication: (value : boolean) => set(() => ({ authentication: value })),
  setNotification: (value : notificationType) => set(() => ({ notification: value })),
  setUpdate: () => set(() => ({ update: !get().update })),
  setModal: () => set(() => ({ modal: !get().modal })),
}))