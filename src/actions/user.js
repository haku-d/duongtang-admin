//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS'
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE'
export const SIGNIN_FROM_SESSION = 'SYNC_FROM_SESSION'

//log out user
export const LOGOUT_USER = 'LOGOUT_USER'

export function signInUser(formValues) {
  return {
    type: SIGNIN_USER,
    payload: formValues
  }
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user
  }
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}

export function signinFromSession(user) {
  return {
    type: SIGNIN_FROM_SESSION,
    payload: user
  }
}
