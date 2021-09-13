import { Grid, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

export const Panel = ({
  s, value, label, classes
}) => <div className={s}>
  <Grid container item direction='column' justifyContent='center'>
    <Grid container item justifyContent='center'>
      <Typography variant='h4' component='h5'>
        {value}
      </Typography>
    </Grid>
    {label && (
      <Grid container item justifyContent='center'>
        <Typography variant='body2'
          className={classes.levelText}
          component='h5'>
          {label}
        </Typography>
      </Grid>
    )}
  </Grid>
</div>

const xs = (w) => {
  if (w.length > 9)  return 3
  if (w.length > 3) return 2
  return 1
}

export const StackStace = ({
  classes, words
}) => <Grid container>
  <div className={classes.stackTrace}>
    <Grid container item direction='row'>
      {words.map(word => <Grid key={word.id}
        className={classes.wordContainer} container item
        xs={xs(word.value)} justifyContent='center'>
        <Typography className={classes.word}>
          {word.value}
        </Typography>
      </Grid>)}
    </Grid>
  </div>
</Grid>

export const arrayToObject = (a) => {
  const words = a.split(' ')
  let count = 0
  const newWords = []
  words.forEach(word => {
    count += word.length
    if (count < 31) newWords.push(word)
  })
  return newWords.map((e, i) => ({
    id: i,
    value: e
  }))
}

Panel.propTypes = {
  s: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
}
Panel.defaultProps = {
  label: ''
}
StackStace.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string
  }))
}
