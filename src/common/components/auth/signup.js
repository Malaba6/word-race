import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form } from "../shared/Form"
import notify from "../shared/Toaster"

export const Signup = () => {
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    // eslint-disable-next-line no-undef
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`
      + '/api/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': '*'
      },
      body: JSON.stringify(values)
    })
    const response = await result.json()
    if (response.data) {
      notify('User successfully Created', 'success')
      router.push('/login')
    } else {
      notify(response.error ? response.error : 'Network error!', 'error')
      setLoading(false)
    }
  }

  return <Form
    label='Sign Up'
    href='/login'
    isSignupForm
    isLoading={isLoading}
    handleSubmit={handleSubmit}
    initialValues={initialValues}
    action="Already have an account? Login" />
}

export default Signup