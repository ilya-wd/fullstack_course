import { changeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ changeFilter }) => {
  const handleChange = (event) => {
    changeFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange}></input>
    </div>
  )
}

export default connect(null, { changeFilter })(Filter)