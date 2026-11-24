import { useAnecdoteActions } from "../stores/anecdotes"
import { useNotificationActions } from "./../stores/notification"

const AnecdoteForm= () => {
  const { addAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await addAnecdote(content)
    e.target.reset()
    setNotification(`New anecdote '${content}' added!`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
