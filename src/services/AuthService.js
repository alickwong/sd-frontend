import ApiService from './ApiService'
import {Auth, Hub} from 'aws-amplify';
import useAuth, {signInSucessFlow} from '../utils/hooks/useAuth'

export async function apiGetCurrentSession() {
  try {
    const cognitoUserSession = await Auth.currentSession();
    return cognitoUserSession;
  } catch (error) {
    console.log('error refresh token', error);
  }
}

export async function apiSignIn(username, password) {
  try {
    const cognitoUser = await Auth.signIn(username, password);

    let finappUser = {
      username: cognitoUser.username,
      userId: cognitoUser.attributes.sub,
      email: cognitoUser.attributes.email,
    };
    console.log(cognitoUser, finappUser);
    return {cognitoUser, finappUser};
  } catch (error) {
    console.log('error signing in', error);
  }

  return;
}

export async function apiSignUp(email, password) {
  try {
    const response = await Auth.signUp({
      username: email,
      password: password,
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });

    // let cognitoUser = await apiGetCurrentSession();

    return {
      isSuccess: true,
      cognitoUser: response.user,
      message: ''
    };

    // return {
    //   isSuccess: false,
    //   cognitoUser: null,
    //   message: ''
    // };

  } catch (error) {
    try {
      const response = await Auth.confirmSignUp(email, '11');
    } catch (error2) {
      // If user is not confirmed, should go to confirm UI
      if(error2.message.indexOf('Current status is CONFIRMED') === -1) {
        return {
          isSuccess: true,
          cognitoUser: null,
          message: ''
        };
      }

      console.log('error signing up 2:', error2);
    }

    console.log('error signing up:', error);
    return {
      isSuccess: false,
      cognitoUser: null,
      message: error.message
    };
  }
}

export async function confirmEmail(email, code) {
  try {
    // console.log('email', email, code);
    const response = await Auth.confirmSignUp(email, code);

    console.log('confirm Email', response);
    return [true, response, 'success'];
  } catch (error) {
    console.log('error auth:', error);
    return [false, null, error.message];
  }
}

export async function apiSignOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

export async function apiForgotPassword(data) {
  return ApiService.fetchData({
    url: '/forgot-password',
    method: 'post',
    data,
  })
}

export async function apiResetPassword(data) {
  return ApiService.fetchData({
    url: '/reset-password',
    method: 'post',
    data,
  })
}

export async function listenToAutoSignInEvent(signInSuccessFlow) {
  Hub.listen('auth', async ({ payload }) => {
    const { event } = payload;
    if (event === 'autoSignIn') {
      const cognitoUser = payload.data;
      if(cognitoUser) {
        let jwt = cognitoUser.signInUserSession.getAccessToken().getJwtToken();
        await signInSuccessFlow(jwt, cognitoUser);
      }

      // await signInSuccessFlow(token, resp.finappUser);
      // assign user
    } else if (event === 'autoSignIn_failure') {
      await apiSignOut();
    }
  })
}
