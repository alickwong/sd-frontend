import React, {useState} from 'react'
import {Input, Button, FormItem, FormContainer, Alert} from 'components/ui'
import {ActionLink} from 'components/shared'
import {apiForgotPassword, apiGetCurrentSession, confirmEmail, listenToAutoSignInEvent} from 'services/AuthService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import {Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useLocation, useNavigate} from "react-router-dom";
import appConfig from "../../../configs/app.config";
import {onSignInSuccess} from "../../../store/auth/sessionSlice";
import {setUser} from "../../../store/auth/userSlice";
import {useDispatch} from "react-redux";
import useAuth from "../../../utils/hooks/useAuth";
import toast from '../../../components/ui/toast'


const validationSchema = Yup.object().shape({
  code: Yup.string().required('Please enter your verification code'),
})

const ConfirmEmailForm = (props) => {
  const {
    signUpUrl = '/sign-up',
  } = props

  const {state} = useLocation();
  const {signInSuccessFlow} = useAuth();

  console.log(state);

  const navigate = useNavigate()

  const {disableSubmit = false, className, signInUrl = '/sign-in'} = props

  const [emailSent, setEmailSent] = useState(false)

  const [message, setMessage] = useTimeOutMessage()

  let dispatch = useDispatch();

  let list = listenToAutoSignInEvent(signInSuccessFlow);

  const onSendMail = async (values, setSubmitting) => {
    setSubmitting(true)
    try {
      let email = state.email ? state.email : values.email;
      const [isSuccess, resp, message] = await confirmEmail(email, values.code)
      if (isSuccess) {
        setSubmitting(false)
        setEmailSent(true)
        console.log('confirm success', resp)

        toast.push(
          <Alert showIcon closable type="success" rounded={false}>
            Validation success, please wait for redirection...
          </Alert>,
          {
            offsetX: 0,
            offsetY: 0,
            transitionType: 'fade',
            block: true,
          }
        )


        // navigate('/sign-in', {
        //   state: {
        //     email: email
        //   }
        // })

        // let cognitoUser = await apiGetCurrentSession();
        // console.log('cognitoUser', cognitoUser)
        // const token = cognitoUser.getAccessToken().getJwtToken();
        // dispatch(onSignInSuccess(token))
        // if (resp.cognitoUser) {
        //   dispatch(
        //     setUser(
        //       resp.finappUser
        //     )
        //   )
        // }

        navigate(
          appConfig.authenticatedEntryPath
        )


      } else {
        setSubmitting(false)
        setMessage(message)
        setEmailSent(false)
      }
    } catch (errors) {
      setMessage(errors?.response?.data?.message || errors.toString())
      setSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="mb-1">Confirm Your Email</h3>
        <p>
          A verification code have been sent to your email.
          Please enter your verification code here:
        </p>
      </div>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{
          email: state.email,
          code: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          if (!disableSubmit) {
            onSendMail(values, setSubmitting)
          } else {
            setSubmitting(false)
          }
        }}
      >
        {({touched, errors, isSubmitting}) => (
          <Form>
            <FormContainer>
              <div>
                <FormItem
                  invalid={errors.email && touched.email}
                  errorMessage={errors.email}
                >
                  <Field
                    type="string"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  invalid={errors.code && touched.code}
                  errorMessage={errors.code}
                >
                  <Field
                    type="string"
                    autoComplete="off"
                    name="code"
                    placeholder="Code"
                    component={Input}
                  />
                </FormItem>
              </div>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                Verify
              </Button>
              <div className="mt-4 text-center">
                <span>Don't have an account yet? </span>
                <ActionLink to={signUpUrl}>Sign up</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ConfirmEmailForm
