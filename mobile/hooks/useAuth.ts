import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../state/store';
import { login, logout } from '../state/user/userSlice';
import { login as signInUser } from "../service/auth" 

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select auth state from Redux
  const { user, accessToken, newUser } = useSelector((state: RootState) => state.user);

  // Wrap logout in a function
  const signOut = () => {
    dispatch(logout());
  };

  const signIn = async (credentials: {email: string, password: string}) => {
    console.log("\n\nAAAA!!!", credentials)
    try {
        const res = await signInUser(credentials);
        console.log("\n\ZZZZ!!!", res.data)
        dispatch(login(res.data));
        return res;
    } catch (error) {
        console.log(error);
    }
  };

  return {
    user,
    isAuthenticated: !!user && !!accessToken,
    signOut,
    signIn,
    newUser,
  };
}

export default useAuth;