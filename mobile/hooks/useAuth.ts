import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store';
import { loadUser, loginUser, logoutUser } from "../service/auth" 
import { useState } from 'react';

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, accessToken, newUser } = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    await dispatch(logoutUser());
  };

  const load = async () => {
    try {
      setIsLoading(true);
      const data = await dispatch(loadUser()).unwrap();
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      console.log("Login failed:", error);
      throw error;
    }
  };

  const signIn = async (credentials: {email: string, password: string}) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return result;
    } catch (error) {
      console.log("Login failed:", error);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated: !!user && !!accessToken,
    signOut,
    signIn,
    load,
    isLoading,
    newUser,
    accessToken
  };
}

export default useAuth;