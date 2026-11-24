import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from './../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './anecdotes'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test anecdote', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes)
  })

  it('the component recieves anecdotes ordered by votes', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'Test anecdote 1', votes: 0 },
      { id: 2, content: 'Test anecdote 2', votes: 2 },
      { id: 3, content: 'Test anecdote 3', votes: 1 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const expectedResult = [
      { id: 2, content: 'Test anecdote 2', votes: 2 },
      { id: 3, content: 'Test anecdote 3', votes: 1 },
      { id: 1, content: 'Test anecdote 1', votes: 0 }
    ]

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(expectedResult)
  })

  it('the component recieves a filtered lists of anecdotes', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'Test anecdote 1', votes: 0 },
      { id: 2, content: 'Test anecdote 2', votes: 2 },
      { id: 3, content: 'Test anecdote to filter', votes: 1 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
      await result.current.setFilter('filter')
    })

    const expectedResult = [
      { id: 3, content: 'Test anecdote to filter', votes: 1 }
    ]

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(expectedResult)
  })

  it('voting increases the number of votes for an anecdote', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'Test anecdote', votes: 0 },
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const mockUpdatedAnecdote = { id: 1, content: 'Test anecdote', votes: 1 }
    anecdoteService.update.mockResolvedValue(mockUpdatedAnecdote)


    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
      await result.current.addVote(1)
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual([mockUpdatedAnecdote])
  })
})