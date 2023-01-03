import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) return null
  //TODO: return something like "NO USER FOUND"???

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
