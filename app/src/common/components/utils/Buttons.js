import { Button as Btn, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.main,
    '&:hover': {
      background: 'transparent',
      color: theme.palette.secondary.main
    }
  },
  authButton: {
    marginLeft: '1em',
    background: 'secondary',
    color: 'primary',
    fontWeight: 'bolder',
    '@media (max-width: 900px)': {
      width: '90%',
      padding: '1em',
      marginTop: '1em',
    }
  }
}))
export const Button = ({label}) => {
  const classes = useStyles()

  return <Btn color='primary' {...{
    style: {
      border: 'solid #2196f3 thin',
      padding: '0.5em 1em',
      fontWeight: 'bolder',
      fontSize: '1rem',
      marginTop: '1em',
    },
    className: classes.root
  }}>
    {label || 'Learn More'}
  </Btn>
}

export const AuthButton = ({ label, href }) => {
  const classes = useStyles()

  return <Btn key={label}
    {...{
      color: 'secondary',
      className: classes.authButton,
      to: href,
      variant: 'outlined'
    }} >
      {label}
  </Btn>
}

Button.propTypes = {
  label: PropTypes.string
}
AuthButton.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string
}
