import React from 'react'
import {useState} from 'react'
import {Button, Select, Dialog, FormContainer, FormItem, Input, Notification, toast, Spinner} from 'components/ui'
// import { toggleAddCategoryDialog } from '../store/stateSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {apiCreateInstance} from "../../../../services/InstanceService";
import {AiOutlineReload} from 'react-icons/ai'
import {getTransctionHistoryData, setTransactionHistoryData} from "../store/dataSlice";

const AddInstanceButton = () => {
  const dispatch = useDispatch()

  const [dialogIsOpen, setIsOpen] = useState(false);

  const [isCreatingInstance, setIsCreatingInstance] = useState(false);

  const isLoadingInstanceList = useSelector(
    (state) => state.instanceRecordList.data.transactionHistoryLoading
  )

  const openDialog = () => {
    setIsOpen(true)
  }

  const onDialogClose = (e) => {
    if (isCreatingInstance) {
      console.log('not able to close when loading')
      return;
    }
    console.log('onDialogClose', e)
    setIsOpen(false)
  }

  const reloadData = () => {
    console.log('reload data');
    dispatch(getTransctionHistoryData());
  }

  const webUiTypeOptions = [
    {label: 'Automatic1111', value: 'Automatic1111'},
    {label: 'InvokeAI', value: 'InvokeAI'},
    {label: 'ComfyUI', value: 'ComfyUI'},
  ];


  const instanceTypeOptions = [
    {label: 'g5.2xlarge', value: 'g5.2xlarge'},
    {label: 'g5.4xlarge', value: 'g5.4xlarge'},
  ];

  const instanceCapacityTypeOptions = [
    {label: 'On Demand', value: 'on-demand'},
    {label: 'Spot', value: 'spot'},
  ]

  const validationSchema = Yup.object().shape({
    webUiType: Yup.string().required('Please enter your gender'),
  })

  return (
    <div>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">New Stable Diffusion Instance</h5>
        <Formik
          // Remove this initial value
          initialValues={{
            webUiType: 'Automatic1111',
            instanceType: 'g5.2xlarge',
            instanceCapacityType: 'spot',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, {setSubmitting}) => {
            setIsCreatingInstance(true);
            // setSubmitting(true)

            let error = false;
            let errorMessage = '';
            try {
              let result = await apiCreateInstance(values);

              if (result.data && result.data.instanceId) {
                toast.push(<Notification title={'Instance Created'} type="success"/>, {
                  placement: 'top-center',
                })

                onDialogClose();

                reloadData();

                console.log('created', result);
              } else {
                error = true;
              }
            } catch (e) {
              console.log('errrosssssss');
              error = true;
              errorMessage = e.message;
            }

            if (error) {
              toast.push(<Notification title={errorMessage} type="danger"/>, {
                placement: 'top-center',
              })
            }

            setIsCreatingInstance(false);
            // setSubmitting(false)
          }}
        >
          {({values, touched, errors, isSubmitting}) => {
            return (
              <Form>
                <FormContainer>
                  <FormItem
                    label="WebUI Type"
                    invalid={
                      errors.webUiType && touched.webUiType
                    }
                    errorMessage={errors.webUiType}
                  >
                    <Field name="webUiType">
                      {({field, form}) => (
                        <Select
                          placeholder="WebUI Type"
                          field={field}
                          form={form}
                          options={webUiTypeOptions}
                          value={webUiTypeOptions.filter(
                            (options) =>
                              options.value ===
                              values.webUiType
                          )}
                          onChange={(gender) =>
                            form.setFieldValue(
                              field.name,
                              gender.value
                            )
                          }
                        />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem
                    label="Instance Type"
                    invalid={
                      errors.instanceType && touched.instanceType
                    }
                    errorMessage={errors.instanceType}
                  >
                    <Field name="instanceType">
                      {({field, form}) => (
                        <Select
                          placeholder="Instance Type"
                          field={field}
                          form={form}
                          options={instanceTypeOptions}
                          value={instanceTypeOptions.filter(
                            (options) =>
                              options.value ===
                              values.instanceType
                          )}
                          onChange={(instanceType) =>
                            form.setFieldValue(
                              field.name,
                              instanceType.value
                            )
                          }
                        />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem
                    label="Instance Capacity Type"
                    invalid={
                      errors.instanceCapacityType && touched.instanceCapacityType
                    }
                    errorMessage={errors.instanceCapacityType}
                  >
                    <Field name="instanceCapacityType">
                      {({field, form}) => (
                        <Select
                          placeholder="Instance Capacity Type"
                          field={field}
                          form={form}
                          options={instanceCapacityTypeOptions}
                          value={instanceCapacityTypeOptions.filter(
                            (options) =>
                              options.value ===
                              values.instanceCapacityType
                          )}
                          onChange={(instanceCapacityType) =>
                            form.setFieldValue(
                              field.name,
                              instanceCapacityType.value
                            )
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  <Button
                    block
                    loading={isCreatingInstance}
                    variant="solid"
                    type="submit"
                  >
                    {isCreatingInstance ? 'Creating Instance...' : 'Create'}
                  </Button>
                </FormContainer>
              </Form>
            )
          }}
        </Formik>
      </Dialog>

      <div className="flex flex-col lg:flex-row lg:items-center gap-2">
        <Button onClick={openDialog} size="sm" variant="solid">
          Add Instance
        </Button>

        <Button icon={isLoadingInstanceList ? <Spinner/> : <AiOutlineReload onClick={reloadData}/>}/>
      </div>
    </div>
  )
}

export default AddInstanceButton
