/* eslint-disable no-undef */
import jwt from 'jwt-decode'

const authToken = () => {
  const accessToken = localStorage.getItem('token')
  try{
    const user = jwt(accessToken)
    return {
      user,
      isAuthenticated: true
    }
  } catch (error) {
    return {
      user: {},
      isAuthenticated: false,
      error: 'Invalid token'
    }
  }
}

export default authToken