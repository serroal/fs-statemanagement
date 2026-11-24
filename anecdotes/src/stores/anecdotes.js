import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addVote: async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(
        state => ({ 
          anecdotes: state.anecdotes.map(anecdote => 
            anecdote.id === id ? updated : anecdote
          ).toSorted((a, b) => b.votes - a.votes)
        })
      )
    },
    addAnecdote: async anecdote => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
    },
    setFilter: value => set( () => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: anecdotes.toSorted((a, b) => b.votes - a.votes) }))
    },
  },
}))

export const useAnecdotes = () => {
   const anecdotes = useAnecdoteStore((state) => state.anecdotes)
   const filter = useAnecdoteStore((state) => state.filter)

   return anecdotes.filter( anecdote => anecdote.content.includes(filter))
}

export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)
