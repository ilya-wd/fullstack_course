import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, removeUser, loginUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogPost from './components/BlogPost'
import User from './components/User'
import Users from './components/Users'
import Navigation from './components/Navigation'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  const login = async (username, password) => {
    dispatch(loginUser(username, password))
  }

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    )
  }

  return (
    <div className="container">
      <Navigation></Navigation>
      <h2>blogs</h2>

      <Notification />

      <div id="blogs">
        <Routes>
          <Route path="" element={<BlogList />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
