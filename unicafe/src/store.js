import { create } from 'zustand'
import { useShallow } from "zustand/react/shallow"

const useFeedbackStore = create(set => ({
  good: 0,
  bad: 0,
  neutral: 0,
  actions: {
    addGood: () => set(state => ({ good: state.good + 1 })),
    addBad: () => set(state => ({ bad: state.bad + 1 })),
    addNeutral: () => set(state => ({ neutral: state.neutral + 1 })),
  }  
}))

export const useValues = () => useFeedbackStore(
  useShallow((state) => {
    const all = state.good + state.neutral + state.bad
    return {
      good: state.good,
      bad: state.bad,
      neutral: state.neutral,
      all,
      average: all ? (state.good - state.bad) / all : 0,
      positive: all ? state.good * 100 / all : 0
    }
  })
)

export const useFeedbackControls = () => useFeedbackStore(state => state.actions)