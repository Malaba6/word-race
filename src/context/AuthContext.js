/* eslint-disable no-undef */
import { useContext, createContext, useEffect, useReducer } from "react"
import PropTypes from "prop-types"
import authToken from '../common/components/utils/authToken'

const AuthContext = createContext({})
const initialState = {user: null, loading: true, error: null}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  let localState = null
  if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
    localState = authToken()
  }

  const [state, dispatch] = useReducer(reducer, localState || initialState)

  useEffect(() => {
    localStorage.setItem('token', state.accessToken)
    localStorage.setItem('user', state.email)
  }, [state])

  return <AuthContext.Provider value={{state, dispatch}}>
    { children }
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider