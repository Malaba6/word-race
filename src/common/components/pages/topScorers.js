import { makeStyles } from "@material-ui/core"
import { ScoreTable } from "../utils/table"
import {
  topScoreColumns as columns, topScoresRows as rows
} from "../utils/constants"

const useStyles = makeStyles(() => ({
  content: {
    paddingTop: '5em',
    minHeight: '100vh',
    width: '100%'
  },
}))

export const TopScorers = () => {
  const classes = useStyles()

  return <main className={classes.content}>
    <div className={classes.boardWrapper}>
      <ScoreTable
        columns={columns}
        label='The Top 10 Scorers'
        rows={rows} />
    </div>
  </main>
}

export default TopScorers