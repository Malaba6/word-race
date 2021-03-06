import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      secondary: '#424242',
    },
    secondary: {
      main: '#2196f3',
      secondary: '#333',
      menu: '#eeeeee',
      resctangle: '#42A7DF',
      trapezoid: '#7DB700',
      parallello: '#8F63D7'
    },
    text: {
      secondary: 'rgba(255, 255, 255, 0.7)',
      menu: '1.1rem',
      dark: '#57595D'
    },
    linear: {
      main: 'linear-gradient(180deg,rgba(0,0,0,.9), rgba(100,0,0,0))',
      reverse: 'linear-gradient(360deg,rgba(0,0,0,.8), rgba(100,0,0,0))'
    },
  },
});

export default theme;