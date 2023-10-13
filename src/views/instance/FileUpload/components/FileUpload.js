import React from 'react'
import {
  Input,
  Avatar,
  Upload,
  Button,
  Select,
  Switcher,
  Notification,
  toast,
  FormContainer,
} from 'components/ui'
import FormDescription from './FormDesription'
import FormRow from './FormRow'
import {Field, Form, Formik} from 'formik'
import {components} from 'react-select'
import {
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlineBriefcase,
  HiOutlineUser,
  HiCheck,
  HiOutlineGlobeAlt,
} from 'react-icons/hi'
import * as Yup from 'yup'
import {apiUploadFile} from "../../../../services/InstanceService";

const {Control} = components

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required'),
  auto11FileType: Yup.string(),
  url: Yup.string(),
})

const Auto11FileTypeOptions = [
  {value: 'model', label: 'Model'},
  {value: 'lora', label: 'Lora'},
  {value: 'extension', label: 'Extension'},
]

const CustomSelectOption = ({innerProps, label, data, isSelected}) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected
          ? 'bg-gray-100 dark:bg-gray-500'
          : 'hover:bg-gray-50 dark:hover:bg-gray-600'
      }`}
      {...innerProps}
    >
      <div className="flex items-center">
        {/*<Avatar shape="circle" size={20} src={data.imgPath} />*/}
        <span className="ml-2 rtl:mr-2">{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl"/>}
    </div>
  )
}

const CustomControl = ({children, ...props}) => {
  const selected = props.getValue()[0]
  return (
    <Control {...props}>
      {selected && (
        <Avatar
          className="ltr:ml-4 rtl:mr-4"
          shape="circle"
          size={18}
          src={selected.imgPath}
        />
      )}
      {children}
    </Control>
  )
}

const FileUpload = ({data}) => {
  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, URL.createObjectURL(file[0]))
  }

  const onFormSubmit = async (values, setSubmitting) => {
    let result = await apiUploadFile(values.auto11FileType, values.url);
    console.log(result);
    // toast.push(<Notification title={'Profile updated'} type="success"/>, {
    //   placement: 'top-center',
    // })
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={data}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true)
        onFormSubmit(values, setSubmitting)
      }}
    >
      {({values, touched, errors, isSubmitting, resetForm}) => {
        const validatorProps = {touched, errors}
        return (
          <Form>
            <FormContainer>
              <FormDescription
                title="General"
                desc="Basic info, like your name and address that will displayed in public"
              />
              <FormRow
                name="auto11FileType"
                label="File Type"
                {...validatorProps}
              >
                <Field name="auto11FileType">
                  {({field, form}) => (
                    <Select
                      field={field}
                      form={form}
                      options={Auto11FileTypeOptions}
                      components={{
                        Option: CustomSelectOption,
                        Control: CustomControl,
                      }}
                      value={Auto11FileTypeOptions.filter(
                        (option) =>
                          option.value === values?.auto11FileType
                      )}
                      onChange={(option) =>
                        form.setFieldValue(
                          field.name,
                          option.value
                        )
                      }
                    />
                  )}
                </Field>
              </FormRow>
              <FormRow
                name="url"
                label="URL"
                {...validatorProps}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="name"
                  placeholder="URL"
                  component={Input}
                />
              </FormRow>
              <div className="mt-4 ltr:text-right">
                <Button
                  className="ltr:mr-2 rtl:ml-2"
                  type="button"
                  onClick={resetForm}
                >
                  Reset
                </Button>
                <Button
                  variant="solid"
                  loading={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Uploading' : 'Upload'}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )
      }}
    </Formik>
  )
}

export default FileUpload
