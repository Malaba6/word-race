import { makeStyles } from "@material-ui/core/styles"
import {
  RecentScore, LatestScores, Analysis
} from "../utils/myScore"
// import * as s from '../styles/home.module.css'


const useStyles = makeStyles(() => ({
  content: {
    paddingTop: '5em',
    minHeight: '100vh',
    width: '100%',
  },
}))

export const Profile = () => {
  const classes = useStyles()

  return <main className={classes.content}>
    <div className={classes.profileWrapper}>
      <RecentScore />
      <LatestScores />
      <Analysis />
    </div>
  </main>
}

export default Profile