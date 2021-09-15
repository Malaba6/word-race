import { ThemeProvider } from '@mui/material/styles'
import {AppBarLayout} from '../layout/AppBarLayout'
import {Race} from '../common/components/pages/race'
import {theme} from '../../styles/theme'

export default function Account() {
  return <ThemeProvider theme={theme}>
    <Race />
  </ThemeProvider>
}

Account.Layout = AppBarLayout
