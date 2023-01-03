import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { connect, useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogDetails = ({ blog, likeBlog, removeBlog, own }) => {
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      added by {addedBy}
      {own && <button onClick={() => removeBlog(blog.id)}>remove</button>}
    </div>
  )
}

const BlogPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const match = useMatch('/blogs/:id')
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const likeBlogComponent = async () => {
    const liked = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id,
    }
    dispatch(likeBlog(liked))
  }

  const removeBlogComponent = async () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)

    if (!ok) {
      return
    }

    dispatch(removeBlog(blog))
    navigate('/')
  }

  return (
    <div className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <BlogDetails blog={blog} likeBlog={likeBlogComponent} removeBlog={removeBlogComponent} own={blog.user && user.username === blog.user.username} />
    </div>
  )
}

export default connect(null, { likeBlog, removeBlog })(BlogPost)
