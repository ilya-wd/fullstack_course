import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:
  {
    castVote(state, action) {
      const id = action.payload.id
      // const anecdoteToChange = state.find(a => a.id === id)
      // const changedAnecdote = {
      //   ...anecdoteToChange,
      //   votes: anecdoteToChange.votes + 1
      // }
      return state.map(a => a.id !== id ? a : action.payload)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

export const { castVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdoteServer = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew({content, votes: 0})
    dispatch(createAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const anecdoteUpd = await anecdotesService.update(
      {...anecdote, votes: anecdote.votes + 1}
    )
    dispatch(castVote(anecdoteUpd))
  }
}


export default anecdoteSlice.reducer

