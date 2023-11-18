import { create } from 'zustand'

export const useStore = create<{
  authentication: boolean,
  loader: boolean,
  update: boolean,
  modal: boolean,
  setAuthentication: (value : boolean) => void,
  setLoader: (value : boolean) => void,
  setModal: () => void
  setUpdate: () => void

}>((set, get) => ({
  authentication: false,
  update: false,
  loader: false,
  modal: false,
  setLoader: (value : boolean) => set(() => ({ loader: value })),
  setAuthentication: (value : boolean) => set(() => ({ authentication: value })),
  setUpdate: () => set(() => ({ update: !get().update })),
  setModal: () => set(() => ({ modal: !get().modal })),
}))