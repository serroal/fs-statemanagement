import { useAnecdotes, useAnecdoteActions } from "./../stores/anecdotes"
import { useNotificationActions } from "./../stores/notification"


const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { addVote, deleteAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const vote = async (anecdote) => {
    await addVote(anecdote.id)
    setNotification(`You voted '${anecdote.content}'`)
  }

  const handleDelete  = async (anecdote) => {
    if(window.confirm(`Remove anecdote ${anecdote.content}`)){
      await deleteAnecdote(anecdote.id)
    }
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            {!anecdote.votes && <button onClick={() => handleDelete(anecdote)}>delete</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
