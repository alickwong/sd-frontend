import React from 'react'
import {toast, Notification} from 'components/ui'
import {ConfirmDialog} from 'components/shared'
import {useSelector, useDispatch} from 'react-redux'
import {toggleDeleteConfirmation, setIsDeletingInstance} from '../store/stateSlice'
import {deleteProduct, getProducts, getTransctionHistoryData} from '../store/dataSlice'
import {apiDeleteInstance} from "../../../../services/InstanceService";

const InstanceDeleteConfirmation = () => {
  const dispatch = useDispatch()
  const dialogOpen = useSelector(
    (state) => state.instanceRecordList.state.isDeleteConfirmationOpened
  )
  const selectedInstanceId = useSelector(
    (state) => state.instanceRecordList.state.selectedInstanceId
  )

  const isDeletingInstance = useSelector(
    (state) => state.instanceRecordList.state.isDeletingInstance
  )

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false))
  }

  const onDelete = async () => {
    dispatch(setIsDeletingInstance(true))

    let success;
    try {
      success = await apiDeleteInstance(selectedInstanceId)
    }catch (e) {

    }

    console.log('delete instance', success);

    if (success) {
      dispatch(getTransctionHistoryData())
      toast.push(
        <Notification
          title={'Successfuly Deleted'}
          type="success"
          duration={3000}
        >
          Instance successfuly deleted
        </Notification>,
        {
          placement: 'top-center',
        }
      )

      dispatch(toggleDeleteConfirmation(false))
    }else {
      toast.push(
        <Notification
          title={'Error Occured'}
          type="danger"
          duration={5000}
        >
          Instance is not deleted yet...
        </Notification>,
        {
          placement: 'top-center',
        }
      )
    }

    dispatch(setIsDeletingInstance(false))
  }

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete instance"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      isLoading={isDeletingInstance}
    >
      <p>
        Are you sure you want to delete this Instance? All images in
        this instance will be deleted as well. This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  )
}

export default InstanceDeleteConfirmation
