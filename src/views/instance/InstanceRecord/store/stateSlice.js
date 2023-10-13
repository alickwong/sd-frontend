import {createSlice} from '@reduxjs/toolkit'

const stateSlice = createSlice({
  name: 'instanceRecordList/state',
  initialState: {
    isDeleteConfirmationOpened: false,
    selectedInstanceId: 0,
    isDeletingInstance: false
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.isDeleteConfirmationOpened = action.payload
    },
    setSelectedInstanceId: (state, action) => {
      state.selectedInstanceId = action.payload
    },
    setIsDeletingInstance: (state, action) => {
      state.isDeletingInstance= action.payload
    },
  },
})

export const {toggleDeleteConfirmation, setSelectedInstanceId, setIsDeletingInstance} = stateSlice.actions

export default stateSlice.reducer
