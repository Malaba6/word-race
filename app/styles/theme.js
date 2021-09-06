import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      secondary: '#424242',
    },
    secondary: {
      main: '#2196f3',
      secondary: '#333'
    },
    text: {
      secondary: 'rgba(255, 255, 255, 0.7)'
    },
    linear: {
      main: 'linear-gradient(180deg,rgba(0,0,0,.9), rgba(100,0,0,0))',
      reverse: 'linear-gradient(360deg,rgba(0,0,0,.8), rgba(100,0,0,0))'
    },
  },
});

export default theme;