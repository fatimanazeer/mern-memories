import { AUTH } from '../constants/actionTypes';
import * as api from '../api';




const storeAuthData = (userInfo, access_token) => ({
    type: AUTH,
    payload: { userInfo, access_token},
  });
  
  export default storeAuthData;
  

export const Signin = (formData, navigate) => async (dispatch) => {
   try {
    const { data } = await api.signIn(formData)
    const { userInfo, access_token } = data;
    dispatch(storeAuthData(userInfo, access_token));
    navigate('/')
   } catch (error) {
    console.log(error)
   }
}

export const Signup = (formData, navigate) => async (dispatch) => {
  try {
    // console.log({formData})
    const obj = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email : formData.email,
      password : formData.password
    }

    console.log({obj});

    const { data } = await api.signUp(formData)
    const { userInfo, access_token } = data;
    dispatch(storeAuthData(userInfo, access_token));

   navigate('/')
  } catch (error) {
   console.log(error)
  }
}