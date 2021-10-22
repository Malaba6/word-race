import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import {Nav} from "../common/components/shared/Nav"
import {SideBar} from "../common/components/shared/SideBar"
import { useAppContext } from "../context/Context"
import { useAuth } from "../context/AuthContext"

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  mainPaper: {
    border: 'none',
    boxShadow: 'none'
  }
}))

export const AppBarLayout = (props) => {
  const classes = useStyles()
  const { children } = props
  const { tab } = useAppContext()
  const { state } = useAuth()
  console.log('****** ', state)

  return <>
    <Paper className={classes.mainPaper}>
      <Nav {...props} />
      <div className={classes.root}>
        <SideBar tab={tab} />
        { children }
      </div>
    </Paper>
  </>
}

AppBarLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  tab: PropTypes.string
}

export default AppBarLayout
