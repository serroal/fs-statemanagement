import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { content } = useContext(NotificationContext)

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!content) return null

  return <div data-testid="notification" style={style}>{content}</div>
}

export default Notification
