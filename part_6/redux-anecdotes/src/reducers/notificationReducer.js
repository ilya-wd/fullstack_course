import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return initialState
        }
    }
})

export const {showNotification, removeNotification} = notificationSlice.actions

let time = 0;
export const setTime = (message, sec) => {
    return dispatch => {
        dispatch(showNotification(message))
        clearTimeout(time)
        time = setTimeout(() => {
            dispatch(removeNotification())
        }, sec * 1000)
    }
}

export default notificationSlice.reducer