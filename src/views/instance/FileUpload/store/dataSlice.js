import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


const dataSlice = createSlice({
  name: 'fileDownload/data',
  initialState: {
    // isLoading: true,
  },
  reducers: {
    // setLoading: (state, action) => {
    //     state.isLoading= action.payload
    // },
  },
  extraReducers: {},
})

export const {} =
  dataSlice.actions

export default dataSlice.reducer
