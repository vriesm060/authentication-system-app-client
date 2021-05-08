import { BASE_URL } from '../../constants/api';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const registerUser = (authData) => {
  const { fullName, email, password } = authData;

  return async dispatch => {
    const result = await fetch(`${BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    })

    const resultData = await result.json();
    const actionType = resultData.success ? REGISTER_USER_SUCCESS : REGISTER_USER_FAIL;

    dispatch({
      type: actionType,
      payload: resultData,
    });

    return resultData;
  }
}

export const loginUser = (authData) => {
  const { email, password } = authData;

  return async dispatch => {
    const result = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const resultData = await result.json();
    const actionType = resultData.success ? LOGIN_USER_SUCCESS : LOGIN_USER_FAIL;

    dispatch({
      type: actionType,
      payload: resultData,
    });

    return resultData;
  }
}