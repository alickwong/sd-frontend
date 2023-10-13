import {createSlice} from '@reduxjs/toolkit'

const stateSlice = createSlice({
  name: 'fileDownload/state',
  initialState: {
    isLoading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const {setLoading} = stateSlice.actions

export default stateSlice.reducer
