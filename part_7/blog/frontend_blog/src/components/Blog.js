import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const style = {
    padding: 3,
    margin: 5,
  }

  return (
    // <div style={style} className="blog">
    <tr style={style}>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td>{blog.author}</td>
    </tr>
    // </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default connect(null, { likeBlog, removeBlog })(Blog)
