import Blog from './Blog'
import { useSelector } from 'react-redux'
import NewBlogForm from './NewBlogForm'
import { useRef } from 'react'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const unsortedBlogs = useSelector((state) => state.blogs)
  const blogs = [...unsortedBlogs].sort((b1, b2) => b2.likes - b1.likes)

  const blogFormRef = useRef()

  const styleTable = {
    marginTop: 10,
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      <Table style={styleTable} striped>
        <tbody>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
