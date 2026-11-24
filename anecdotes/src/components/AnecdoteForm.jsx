import { useAnecdoteActions } from "./../store"

const AnecdoteForm= () => {
  const { addAnecdote } = useAnecdoteActions()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote(e.target.anecdote.value)
    e.target.reset()
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
