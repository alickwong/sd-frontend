import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import {apiGetCurrentSession, apiSignIn, apiSignOut, apiSignUp} from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values.email, values.password)
            if (resp && resp.cognitoUser) {
                const token = resp.cognitoUser.signInUserSession.accessToken.jwtToken;
                await signInSuccessFlow(token, resp.finappUser);
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            console.log(errors);
        }

        return {
            status: 'failed',
            message: 'Incorrect Password / User'
        }
    }

    const signInSuccessFlow = async (token, finappUser) => {
        dispatch(onSignInSuccess(token))
        if (finappUser) {
            dispatch(
              setUser(
                finappUser
              )
            )
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY)
        navigate(
          redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
        )
    }

    const signUp = async (values) => {
        try {
            const {isSuccess, response, message} = await apiSignUp(values.email, values.password)
            console.log('sign up response:', isSuccess, response);
            if (isSuccess) {
                return {
                    status: 'success',
                    message: '',
                }
            }

            return {
                status: 'failed',
                message
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const checkAndUpdateToken = async () => {
        try {
            const cognitoUserSession = await apiGetCurrentSession();
            if(!cognitoUserSession) {
                handleSignOut();
            }else {
                dispatch(onSignInSuccess(cognitoUserSession.getAccessToken().getJwtToken()))
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
        checkAndUpdateToken,
        signInSuccessFlow
    }
}

export default useAuth
