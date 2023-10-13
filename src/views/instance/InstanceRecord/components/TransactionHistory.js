import React, {useEffect} from 'react'
import {
  getTransctionHistoryData,
  setTableData,
  initialTableData,
  setTransactionHistoryData,
} from '../store/dataSlice'
import {Card, Tabs} from 'components/ui'
import OrderTable from './OrderTable'
import {useDispatch, useSelector} from 'react-redux'
import AddInstanceButton from "./AddInstanceButton";
import InstanceDeleteConfirmation from "./InstanceDeleteConfirmation";

const {TabNav, TabList, TabContent} = Tabs

const TransactionHistory = () => {
  const dispatch = useDispatch()

  const data = useSelector(
    (state) => {
      return state.instanceRecordList.data.transactionHistoryData;
    }
  )

  const loading = useSelector(
    (state) => state.instanceRecordList.data.transactionHistoryLoading
  )

  const selectedTab = useSelector(
    (state) => state.instanceRecordList.data.selectedTab
  )

  const tableData = useSelector((state) => state.instanceRecordList.data.tableData)

  useEffect(() => {
    dispatch(getTransctionHistoryData({tab: selectedTab, ...tableData}))
  }, [])

  const handleTabChange = (val) => {
    dispatch(setTransactionHistoryData([]))
  }

  return (
    <>
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Instance List</h3>
        <AddInstanceButton/>
      </div>

      <Tabs value={selectedTab} variant="pill" onChange={handleTabChange}>
        <div className="mt-4">
          <TabContent value="trade">
            <OrderTable
              data={data}
              loading={loading}
              pagingData={tableData}
            />
          </TabContent>
        </div>
      </Tabs>

      <InstanceDeleteConfirmation/>
    </>
  )
}

export default TransactionHistory
