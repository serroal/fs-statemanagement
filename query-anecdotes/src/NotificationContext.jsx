import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [content, setContent] = useState(null)

  const showNotification = (content) => {
    setContent(content)
    setTimeout(() => {
      setContent(null)
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ content, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}