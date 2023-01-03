import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
