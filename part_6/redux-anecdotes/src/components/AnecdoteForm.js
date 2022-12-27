import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setTime } from '../reducers/notificationReducer'
import {createAnecdoteServer} from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.content.value
        e.target.content.value = ''
        props.createAnecdoteServer(content)
        dispatch(setTime(`Added ${content}`, 3))
    }

    return (
            <form onSubmit={addAnecdote}>
                <input type="text" name="content" />
                <button type="submit">create</button>
            </form>
    )
}

export default connect(null, { createAnecdoteServer, setTime })(AnecdoteForm)