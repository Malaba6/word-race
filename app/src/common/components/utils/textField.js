import {
  FormControl, InputLabel, OutlinedInput, InputAdornment,
  IconButton, TextField as Field, FormHelperText
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react';

export const PasswordField = ({
  label, name, formik, formikProp
}) => {
  const [values, setValues] = useState({
    showPassword: false,
    showConfirm: false
  })

  const handleClickShowPassword = (field) => {
    setValues({
      ...values,
      [field]: !values[field],
    });
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }
  return <FormControl sx={{ mb: 1 }} fullWidth variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
    <OutlinedInput
      id={name}
      name={name}
      label={label}
      type={values.showPassword ? 'text' : 'password'}
      value={formik.values[formikProp]}
      onChange={formik.handleChange}
      error={formik.touched[formikProp] && Boolean(formik.errors[formikProp])}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => handleClickShowPassword('showPassword')}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {values.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
    {formik.touched[formikProp] && Boolean(formik.errors[formikProp]) && (
      <FormHelperText error>
        {formik.errors[formikProp]}
      </FormHelperText>
    )}
  </FormControl>
}

export const TextField = ({
  name, label, formik, type, formikProp, isSignupForm
}) =>
  <Field
    fullWidth
    id={name}
    name={name}
    type={type || 'text'}
    label={label}
    sx={{ mb: isSignupForm ? 1 : 4 }}
    value={formik.values[formikProp]}
    onChange={formik.handleChange}
    error={formik.touched[formikProp] && Boolean(formik.errors[formikProp] )}
    helperText={formik.touched[formikProp]  && formik.errors[formikProp]}
  />