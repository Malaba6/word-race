/* eslint-disable no-undef */
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form } from "../shared/Form"
import notify from "../shared/Toaster"
import { useAuth } from '../../../context/AuthContext'

export const Login = () => {
  const { dispatch } = useAuth()
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const initialValues = {
    user: '',
    password: ''
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    // eslint-disable-next-line no-undef
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`
      + '/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': '*'
      },
      body: JSON.stringify(values, null, 2)
    })
    const response = await result.json()
    if (response.data) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data
      })
      notify('User successfully Created', 'success')
      router.push('/')
    } else {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: response.error
      })
      notify(response.error ? response.error : 'Network error!', 'error')
      setLoading(false)
    }
  }

  return <Form
    label='Login'
    href='/signup'
    isLoginForm
    isLoading={isLoading}
    handleSubmit={handleSubmit}
    initialValues={initialValues}
    action="Don't have an account? Create account" />
}

export default Login