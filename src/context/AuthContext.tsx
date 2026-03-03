import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {AuthState, User, UserLogin} from '../types/auth';
import {authService} from '../services/authService';

type AuthAction =
  | {type: 'RESTORE_TOKEN'; token: string; refreshToken: string; user: User}
  | {type: 'SIGN_IN'; token: string; refreshToken: string; user: User}
  | {type: 'SIGN_OUT'}
  | {type: 'SET_LOADING'; isLoading: boolean}
  | {type: 'UPDATE_USER'; user: User};

interface AuthContextType {
  state: AuthState;
  signIn: (credentials: UserLogin) => Promise<void>;
  signOut: () => Promise<void>;
  updateTreatmentDate: (date: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
        user: action.user,
        isSignedIn: true,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
        user: action.user,
        isSignedIn: true,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        token: null,
        refreshToken: null,
        user: null,
        isSignedIn: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  isLoading: true,
  isSignedIn: false,
  token: null,
  refreshToken: null,
  user: null,
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const restoreToken = async () => {
      try {
        const {token, refreshToken} = await authService.getStoredTokens();
        if (token && refreshToken) {
          const user = await authService.getUser();
          dispatch({type: 'RESTORE_TOKEN', token, refreshToken, user});
        } else {
          dispatch({type: 'SET_LOADING', isLoading: false});
        }
      } catch {
        dispatch({type: 'SIGN_OUT'});
      }
    };
    restoreToken();
  }, []);

  const signIn = useCallback(async (credentials: UserLogin) => {
    dispatch({type: 'SET_LOADING', isLoading: true});
    try {
      const {token, refreshToken} = await authService.login(credentials);
      const user = await authService.getUser();
      dispatch({type: 'SIGN_IN', token, refreshToken, user});
    } catch (error) {
      dispatch({type: 'SET_LOADING', isLoading: false});
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    dispatch({type: 'SET_LOADING', isLoading: true});
    await authService.logout();
    dispatch({type: 'SIGN_OUT'});
  }, []);

  const updateTreatmentDate = useCallback(async (date: string) => {
    const updatedUser = await authService.updateTreatmentDate(date);
    dispatch({type: 'UPDATE_USER', user: updatedUser});
  }, []);

  const contextValue = useMemo(
    () => ({state, signIn, signOut, updateTreatmentDate}),
    [state, signIn, signOut, updateTreatmentDate],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
