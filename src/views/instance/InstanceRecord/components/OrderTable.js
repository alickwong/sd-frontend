import React, { useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { setTableData } from '../store/dataSlice'
import {
    HiOutlineSwitchHorizontal,
    HiOutlineArrowUp,
    HiOutlineArrowDown,
} from 'react-icons/hi'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import RunButtonActionColumn from './RunButtonActionColumn'
import DeleteButtonActionColumn from './DeleteButtonActionColumn'

export const statusColor = {
    'Pending': {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    'UpAndRunning': {
        label: 'Complete',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    'UserLoggedIn': {
        label: 'Complete',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    'Idle': {
        label: 'Pending',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    'Deleted': { label: 'Canceled', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

const ActionIcon = ({ type }) => {
    switch (type) {
        case 0:
            return (
                <Avatar
                    size="sm"
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    icon={
                        <HiOutlineArrowDown
                            style={{ transform: 'rotate(45deg)' }}
                        />
                    }
                />
            )
        case 1:
            return (
                <Avatar
                    size="sm"
                    className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
                    icon={
                        <HiOutlineArrowUp
                            style={{ transform: 'rotate(45deg)' }}
                        />
                    }
                />
            )
        case 2:
            return (
                <Avatar
                    size="sm"
                    className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
                    icon={<HiOutlineSwitchHorizontal />}
                />
            )
        default:
            return <Avatar />
    }
}

const OrderTable = ({ data, loading, tableData }) => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                Header: 'Instance Id',
                accessor: 'instanceId',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <div>
                                <ActionIcon type={row.actionType} />
                            </div>
                            <span className="font-semibold heading-text whitespace-nowrap">
                                {row.instanceId}
                            </span>
                        </div>
                    )
                },
            },
            {
                Header: 'Created Date',
                accessor: 'createdAt',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs.unix(row.createdAt/1000).format('MM/DD/YYYY')}
                        </div>
                    )
                },
            },
            {
                Header: 'User Name',
                accessor: 'username',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <span>{row.username}</span>
                },
            },
            {
                Header: 'Password',
                accessor: 'password',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {row.password}
                        </span>
                    )
                },
            },
            {
                Header: 'Status',
                accessor: 'instanceStatus',
                sortable: true,
                Cell: (props) => {
                    const  row = props.row.original
                    return (
                      <span>
                            {row.instanceStatus}
                        </span>
                    )
                    // return (
                        // <div className="flex items-center gap-2">
                        //     <Badge className={statusColor[row.instanceStatus].dotClass} />
                        //     <span
                        //         className={`capitalize font-semibold ${statusColor[row.instanceStatus].textClass}`}
                        //     >
                        //         {statusColor[row.instanceStatus].label}
                        //     </span>
                        // </div>
                    // )
                },
            },
            {
                Header: '',
                id: 'deleteAction',
                Cell: (props) => {
                    const row = props.row.original
                    return <DeleteButtonActionColumn row={row} />
                },
            },
            {
                Header: '',
                id: 'runAction',
                Cell: (props) => {
                    const row = props.row.original
                    return <RunButtonActionColumn row={row} />
                },
            },
        ],
        []
    )

    // const onPaginationChange = (page) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageIndex = page
    //     dispatch(setTableData(newTableData))
    // }
    //
    // const onSelectChange = (value) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageSize = Number(value)
    //     newTableData.pageIndex = 1
    //     dispatch(setTableData(newTableData))
    // }
    //
    // const onSort = (sort) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.sort = sort
    //     dispatch(setTableData(newTableData))
    // }

    return (
        <DataTable
            columns={columns}
            data={data}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ size: 'sm', className: 'rounded-md' }}
            loading={loading}
            pagingData={tableData}
            // onPaginationChange={onPaginationChange}
            // onSelectChange={onSelectChange}
            // onSort={onSort}
        />
    )
}

export default OrderTable
