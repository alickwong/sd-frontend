import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetTransctionHistoryData,
} from 'services/InstanceService'


export const getTransctionHistoryData = createAsyncThunk(
    'api/instance/list',
    async (data) => {
        const response = await apiGetTransctionHistoryData(data)
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const dataSlice = createSlice({
    name: 'instanceRecordList/data',
    initialState: {
        loading: true,
        walletsData: [],
        transactionHistoryLoading: true,
        transactionHistoryData: [],
        tableData: initialTableData,
        selectedTab: 'trade',
        deleteConfirmation: false,
        selectedInstanceId: null,

    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setTransactionHistoryData: (state, action) => {
            state.transactionHistoryData = action.payload
        },
    },
    extraReducers: {
        [getTransctionHistoryData.fulfilled]: (state, action) => {
            state.transactionHistoryLoading = false
            state.tableData.total = action.payload.total
            state.transactionHistoryData = action.payload.data
        },
        [getTransctionHistoryData.pending]: (state) => {
            state.transactionHistoryLoading = true
        },
    },
})

export const { setTableData, setTransactionHistoryData } =
    dataSlice.actions

export default dataSlice.reducer
