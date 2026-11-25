import useNotify from '../hooks/useNotify'

const Notification = () => {
  const { content } = useNotify()

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
