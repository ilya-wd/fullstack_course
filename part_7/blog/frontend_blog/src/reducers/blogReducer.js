import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setTime } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeB(state, action) {
      const id = action.payload.id
      return state.map((b) => (b.id !== id ? b : action.payload))
    },
    createB(state, action) {
      state.push(action.payload)
    },
    setB(state, action) {
      return action.payload
    },
    removeB(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { likeB, removeB, setB, createB } = blogSlice.actions

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({ title, author, url, likes: 0 })
      console.log(newBlog)
      dispatch(createB(newBlog))
      dispatch(setTime(`Created ${newBlog.title}`, 'info', 3))
    } catch (e) {
      dispatch(setTime(`Creation failed: ${e.response.data.error}`, 3))
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setB(blogs))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogUpd = await blogService.update(blog.id, blog)
      dispatch(likeB(blogUpd))
      dispatch(setTime(`Liked ${blog.title}`, 'info', 3))
    } catch (e) {
      dispatch(setTime(`Liking failed: ${e.response.data.error}`, 'alert', 3))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeB(blog))
      dispatch(setTime(`Removed ${blog.title}`, 'alert', 3))
    } catch (e) {
      dispatch(setTime(`Deletion failed: ${e.response.data.error}`, 'alert', 3))
    }
  }
}

export default blogSlice.reducer
