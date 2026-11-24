import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: text => {
      set(() => ({ notification: text }))
      setTimeout(() => {
        set(() => ({ notification: null }))
      }, 5000)      
    }
  },
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore(state => state.actions)