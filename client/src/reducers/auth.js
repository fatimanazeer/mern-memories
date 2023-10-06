
import { AUTH, LOGOUT } from '../constants/actionTypes';

const initialState = {
  userInfo: null,
  access_token: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action?.type) {
      case AUTH:
        const newState = {
          ...state,
          userInfo: action?.payload?.userInfo,
          access_token: action?.payload?.access_token,
        };
        console.log('data:', newState);
        if(newState!=null){
          localStorage.setItem('profile', JSON.stringify(newState))
        }else{
          console.log("data hi nhin aya");
        }
        return newState;

        case LOGOUT:
            localStorage.removeItem('profile')
            return initialState;

      default:
        return state;
    }
  };
  
  export default authReducer;