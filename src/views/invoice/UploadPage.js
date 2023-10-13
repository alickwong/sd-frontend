import React from 'react'
import {Notification, toast, Upload, Button, Progress, Input, FormContainer, Select, FormItem} from 'components/ui'
import {HiOutlineCloudUpload} from 'react-icons/hi'
import {FcImageFile} from 'react-icons/fc'
import {Storage} from "@aws-amplify/storage"
import {Field, Form, Formik} from 'formik'
import moment from 'moment'
import {PasswordInput} from "../../components/shared";
import {useSelector} from "react-redux";


const UploadPage = () => {
  const user = useSelector(state => state.auth?.user);

  const openNotification = (type) => {
    toast.push(
      <Notification
        title={type.charAt(0).toUpperCase() + type.slice(1)}
        type={type}
      >
        Upload Success
      </Notification>
    )
  }

  const ProgressBar = () => {
    return (
      <div>
        <Progress percent={30}/>
      </div>
    )
  }

  let uiProgressBar = 0;

  let handleUpload = async (file, bankId, invoiceId) => {


    if (Array.isArray(file)) {
      file = file[0];
    }
    await Storage.put(file.name, file, {
      level: "private",
      completeCallback: (event) => {
        console.log(`Successfully uploaded ${event.key}`);
        // openNotification('success');
      },
      progressCallback: (progress) => {
        if (progress.loaded === progress.total) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          uiProgressBar = Math.round(progress.loaded / progress.total);
          openNotification('success');
        }
      },
      metadata: {
        key: "value",
        alick: 'test',
        userId: user.userId,
        bankId,
        invoiceId
      },
      errorCallback: (err) => {
        console.error('Unexpected error while uploading', err);
      }
    });
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file)
  }


  let getProgress = () => {
    return uiProgressBar;
  }

  const colourOptions = [
    {value: 'hsbc', label: 'HSBC', color: '#00B8D9'},
    {value: 'citi', label: 'City Bank', color: '#0052CC'},
    {value: 'sc', label: 'Standard Chart', color: '#5243AA'},
  ]

  return (
    <div>
      <div className="mb-4">
        <Progress percent={getProgress()}/>
      </div>

      <Formik
        initialValues={{
          invoiceId: moment().format("YYYYMMDDHHmmss"),
          bankId: '',
          name: [],
          uploadFiles: [],
          remark: ''
        }}
        onSubmit={async (values) => {
          // print aws amplify user id
          console.log('form submit', values);
          await handleUpload(values.uploadFiles, values.bankId, values.invoiceId);

          console.log('upload success');
          // await new Promise((r) => setTimeout(r, 500));
        }}
      >
        {({values, touched, errors, isSubmitting}) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Custom Invoice Id"
                invalid={errors.userName && touched.userName}
                errorMessage={errors.userName}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="invoiceId"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Bank Id"
              >
                <Field name="bankId">
                  {({field, form}) => (
                    <Select
                      placeholder="Bank Id"
                      field={field}
                      form={form}
                      options={colourOptions}
                      value={colourOptions.filter(
                        (options) =>
                          options.value ===
                          values.bankId
                      )}
                      onChange={(country) =>
                        form.setFieldValue(
                          field.name,
                          country.value
                        )
                      }
                    />
                  )}

                </Field>
              </FormItem>

              <FormItem
                label="Remark"
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="remark"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Custom Invoice Id"
                invalid={errors.userName && touched.userName}
                errorMessage={errors.userName}
              >
                <Field name="uploadFiles">
                  {({field, form}) => (
                    <Upload draggable
                            onChange={(files) => onSetFormFile(form, field, files)}
                    >
                      <div className="my-16 text-center">
                        <div className="text-6xl mb-4 flex justify-center">
                          <FcImageFile/>
                        </div>
                        <p className="font-semibold">
                              <span className="text-gray-800 dark:text-white">
                                  Drop your image here, or{' '}
                              </span>
                          <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                          Support: jpeg, png, gif
                        </p>
                      </div>
                    </Upload>
                  )}
                </Field>
              </FormItem>

              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? 'Uploading...' : 'Start Upload'}
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UploadPage

