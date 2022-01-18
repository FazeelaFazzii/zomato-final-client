import axios from "axios";

// redux types
import { SIGN_OUT, SIGN_IN, SIGN_UP, GOOGLE_AUTH } from './auth.type';

// redux actions
import { getMySelf, clearUser } from '../user/user.action';

export const signIn = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: "https://zomato-final-server.herokuapp.com/auth/signin",
      data: { credentials: userData },
    });
    

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );

    window.location.reload();

    return dispatch({ type: SIGN_IN, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: "https://zomato-final-server.herokuapp.com/auth/signup",
      data: { credentials: userData },
    });

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );

    window.location.reload();

    return dispatch({ type: SIGN_UP, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("zomatoUser");
    clearUser();
    window.location.href = "https://61e6f24bbf34475863ce0496--gallant-edison-5918f8.netlify.app/delivery";//refresh

    return dispatch({ type: SIGN_OUT, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const googleAuth = (token) => async (dispatch) => {
  try {
    localStorage.setItem("zomatoUser", JSON.stringify({ token }));
    
    return dispatch({ type: GOOGLE_AUTH, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};