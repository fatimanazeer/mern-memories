import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import storeAuthData from '../../actions/auth';
import GoogleIcon from '@mui/icons-material/Google';
import useStyles from './styles'; 

import { Button } from '@mui/material';


const GoogleButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

 

    const googleLoginButton = async (res) =>{
        const { access_token } = res
    
        try {
          const userInfoRes = await fetch ("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              "Authorization": `Bearer ${access_token}`
            }
          })
    
          const userInfo = await userInfoRes.json()
          console.log("access_token:", access_token);
          console.log("userInfo", userInfo);
    
          dispatch(storeAuthData(userInfo,access_token))
    
          navigate('/')
        } catch (error) {
          console.error("Error fetching user information:", error);
    
        }
      }
      
      const login = useGoogleLogin({
        onSuccess: googleLoginButton,
      })
  return (
     <Button onClick={login} className={classes.googleButton}>
          <GoogleIcon/>    Sign in with Google 
    </Button>
  )
}

export default GoogleButton