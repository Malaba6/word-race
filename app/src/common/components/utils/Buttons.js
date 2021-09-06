import { Button as Btn, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.main,
    '&:hover': {
      background: 'transparent',
      color: theme.palette.secondary.main
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

Button.propTypes = {
  label: PropTypes.string
}
