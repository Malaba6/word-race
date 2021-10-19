import { makeStyles, useTheme } from "@material-ui/core"
import {
  Typography, Box, Button,
} from "@mui/material"
import { useFormik } from 'formik'
import PropTypes from "prop-types"
import * as yup from 'yup'
import Link from 'next/link'
import { PasswordField, TextField } from "../utils/textField"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    minHeight: '100vh',
    background: theme.palette.secondary.secondary,
  }
}))

const signupSchema = yup.object({
  firstname: yup
    .string('First Name')
    .min(2, 'Name must be at least 3 characters!')
    .max(50, 'Name is too long!')
    .required('First Name is required!'),
  lastname: yup
    .string('Last Name')
    .min(2, 'Name must be at least 3 characters!')
    .max(50, 'Name is too long!')
    .required('Last Name is required!'),
  username: yup
    .string('Username')
    .min(2, 'Name must be at least 3 characters!')
    .max(50, 'Name is too long!'),
  email: yup
    .string('Email')
    .email('Enter a valid email!')
    .required('Email is required!'),
  password: yup
    .string('Password')
    .min(8, 'Password should be of minimum 8 characters length!')
    .required('Password is required!'),
  confirmpassword: yup
    .string('Confirm Password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const loginSchema = yup.object({
  email: yup
    .string('Email')
    .email('Enter a valid email!')
    .required('Email is required!'),
  password: yup
    .string('Password')
    .min(8, 'Password should be of minimum 8 characters length!')
    .required('Password is required!')
})

export const Form = ({
  label, href, action, isLoginForm, isSignupForm
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const validationSchema = isSignupForm
    ? signupSchema
    : loginSchema

  const isEmpty = obj => !Object.values(obj).filter(e => typeof e !== 'undefined').length;
  
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
    },
  })

  return <div className={classes.root}>
    <Box
      sx={{ textAlign:'center',
        background: '#fff',
        width: '20%', margin: '0 auto',
        pt: isSignupForm ? 4 : 9,
        pb: isSignupForm ? 4 : 9,
        mt: 4,
        mb: 4,
        borderRadius: 4,
        '@media (max-width: 900px)': {
          width: '90%'
        }
      }}>
      <Typography variant='h3' component='h3'>{label}</Typography>
      <Box component='form'
        sx={{
          width: '80%', margin: '0 auto', mt: 5
        }}
        onSubmit={formik.handleSubmit}>
          {isSignupForm && (
            <>
              <TextField
                name='firstname'
                label='First Name'
                formik={formik}
                isSignupForm={isSignupForm}
                formikProp='firstname' />
              <TextField
                name='lastname'
                label='Last Name'
                formik={formik}
                isSignupForm={isSignupForm}
                formikProp='lastname' />
              <TextField
                name='username'
                label='Userame'
                formik={formik}
                isSignupForm={isSignupForm}
                formikProp='username' />
            </>
          )}
    
        <TextField
          name='email'
          label='Email'
          type='email'
          formik={formik}
          isSignupForm={isSignupForm}
          formikProp='email' />
        <PasswordField
          label='Password'
          name='password'
          formikProp='password'
          isSignupForm={isSignupForm}
          formik={formik} />
        
        {isSignupForm && <PasswordField
          label='Confirm Password'
          name='confirmpassword'
          formik={formik}
          isSignupForm={isSignupForm}
          formikProp='confirmpassword' />
        }

        {isLoginForm && <Link href='/#' passHref>
          <Typography sx={{
            float: 'right', color: 'GrayText',
            fontSize: '0.7rem',
            '&:hover': {
              textDecoration: 'underline',
            }
            }}
            variant='caption'
            href='#'
            component='a'>
            Forgot Password?
          </Typography>
        </Link>}
        <Button
          disabled={!isEmpty(formik.errors)}
          sx={{
            background: '#333',
            mb: 1,
            mt: 3,
            '&:hover': {
              backgroundColor: '#2196f3',
              boxShadow: theme.shadows[4]
            }
          }} variant="contained" fullWidth type="submit">
          {label}
        </Button>
        <Link href={href} passHref>
          <Typography
            component='a'
            href={href}
            sx={{
              color: 'GrayText', fontSize: '0.7rem',
              '&:hover': {
                textDecoration: 'underline',
              }
            }} variant='caption'>
            {action}
          </Typography>
        </Link>
      </Box>
    </Box>
  </div>
}

Form.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  action: PropTypes.string,
  isLoginForm: PropTypes.bool,
  isSignupForm: PropTypes.bool
}

export default Form