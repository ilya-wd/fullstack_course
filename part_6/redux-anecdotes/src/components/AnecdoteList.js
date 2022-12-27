
import { useDispatch, useSelector } from 'react-redux'
import { addVote, castVote } from '../reducers/anecdoteReducer'
import { setTime } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => (
    <div>
        <div>{anecdote.content}</div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
    </div>
)

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filtered = useSelector((state) => state.filter)
  console.log(anecdotes)

  const vote = (anecdote) => {
      dispatch(addVote(anecdote))
      dispatch(setTime(`Voted '${anecdote.content}`, 3))
  }

  return (
      <div>
          {anecdotes.slice().sort( (a, b) => b.votes - a.votes).filter(an => an.content.toLowerCase().includes(filtered)).map((anecdote) => (
              <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  handleVote={() => vote(anecdote)}
              />
          ))}
      </div>
  )
}

export default AnecdoteList