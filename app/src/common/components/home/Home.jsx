import { Paper } from '@material-ui/core'
import Nav from '../shared/Nav'

export const Home = (props) => {
  return <>
  <Paper>
    <Nav {...props} />
  </Paper>
  </>
}

export default Home
