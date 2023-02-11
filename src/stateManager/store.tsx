import { createStore, combineReducers } from 'redux';

interface LoginState {
  isLoggedIn: boolean;
  user: {
    email: string;
  }
}

const initialState: LoginState = {
  isLoggedIn: false,
  user: {
    email: '',
  },
};

export const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export interface LoginAction {
  type: typeof LOGIN;
  payload: {
    email: string;
  }
}

interface LogoutAction {
  type: typeof LOGOUT;
}

type LoginActions = LoginAction | LogoutAction;

const loginReducer = (state = initialState, action: LoginActions) => {
  console.log('test');
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: {
            email: action.payload.email,
        },
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {
            email: '',
        },
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  login: loginReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;