import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        <div>
          {users.map((u) => (
            <tr key={u.id}>
              <th key={u.id}>
                <a href={`/users/${u.id}`}> {u.username} </a>
              </th>
              <th> {blogs.filter((b) => b.user.id === u.id).length}</th>
            </tr>
          ))}
        </div>
      </table>
    </div>
  )
}

export default Users
