import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  isLogged: false
}

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser(state, { payload }) {
      return { ...state, isLogged: true, name: payload }
    },
    logout(state) {
      return { ...state, isLogged: false, name: "" }
    }
  }
})

export const { changeUser, logout } = slice.actions

export const selectUser = state => state.user

export default slice.reducer