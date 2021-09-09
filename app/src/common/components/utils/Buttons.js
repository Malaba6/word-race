import { Button as Btn, makeStyles } from '@material-ui/core'
import Link from 'next/link'
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
    fontWeight: 'bolder',
    '@media (max-width: 900px)': {
      width: '90%',
      padding: '1em',
      marginTop: '1em',
      marginLeft: 0,
    }
  }
}))

export const Button = ({label, href}) => {
  const classes = useStyles()

  return <Link href={href || ''} passHref>
    <Btn color='primary' {...{
      style: {
        border: 'solid #2196f3 thin',
        padding: '0.5em 1em',
        fontWeight: 'bolder',
        fontSize: '1rem',
        marginTop: '1em',
      },
      className: classes.root}}>
      {label || 'Learn More'}
    </Btn>
  </Link>
}

export const AuthButton = ({ label, href }) => {
  const classes = useStyles()

  return <Link href={href || ''} passHref>
    <Btn key={label} classes={{text: classes.authButton}}
      {...{
        color: 'secondary',
        className: classes.authButton,
        variant: 'outlined'
      }} >
        {label}
    </Btn>
  </Link>
}

Button.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string
}
AuthButton.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string
}
