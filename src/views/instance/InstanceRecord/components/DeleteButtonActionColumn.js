import React, { useCallback } from 'react'
import { Button } from 'components/ui'
import { useDispatch } from 'react-redux'
import {apiDeleteInstance} from "../../../../services/InstanceService";
import {toggleDeleteConfirmation, setSelectedInstanceId} from "../store/stateSlice";

const DeleteButtonActionColumn = ({ row }) => {
    const dispatch = useDispatch()

    async function deleteInstance(currentRow) {
      console.log('temp', currentRow.instanceId);
      dispatch(toggleDeleteConfirmation(true))
      dispatch(setSelectedInstanceId(row.instanceId))
    }

    return (
        <div className="ltr:text-right rtl:text-left">
            <Button size="sm" onClick={() => deleteInstance(row)}>
                Delete
            </Button>
        </div>
    )
}

export default DeleteButtonActionColumn
