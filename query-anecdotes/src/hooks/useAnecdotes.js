import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
      showNotification(`anecdote '${newAnecdote.content}' added`)
    },
    onError: (error) => {
      showNotification(error.message)
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      showNotification(`anecdote '${updatedAnecdote.content}' voted`)
    }
  })

  return {
    anecdotes: data,
    isPending,
    isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    addVote: (anecdote) => updateAnecdoteMutation.mutate({ 
      ...anecdote, votes: anecdote.votes + 1 
    }),
  }
}