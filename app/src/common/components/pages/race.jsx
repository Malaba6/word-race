/* eslint-disable no-param-reassign */
import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import clsx from 'clsx'
import { Panel, StackStace, arrayToObject as words} from "../utils/panel"
import * as s from '../styles/home.module.css'


const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: '5em',
    minHeight: '100vh',
    width: '100%'
  },
  shapes: {
    marginTop: '10em',
    marginLeft: '3em',
    width: '4em',
  height: '8em',
  },
  shape: {
    arginTop: '20em',
    marginLeft: '3em',
  //   width: '10vw',
  // height: '10vw',
  width: '8em',
	height: '5em',
  clipPath: 'polygon(29% 0, 100% 0, 71% 100%, 0% 100%)',
  background: 'red',
  transform: 'rotate(30deg)'
  // transform: 'perspective(10vw) rotateX(165deg) rotateY(-60deg)'
  },
  boardWrapper: {
    padding: theme.spacing(5),
    border: 'solid thin red'
  },
  rectButton: {
    width: 'fit-content',
    border: 'solid thin red'
  },
  levelText: {
    fontSize: '0.8rem',
    fontWeight: 'bolder'
  },
  stackTrace: {
    margin: '0 auto',
    marginTop: '2em',
    // border: 'solid thin red',
    width: '80%',
    padding: '1em',
    background: '#eeeeee',
    borderRadius: '5px',
    boxShadow: theme.shadows[3]
  },
  wordContainer: {
    border: 'solid 2px #000',
    margin: '0.25em',
    borderRadius: '3px',
    background: '#fff'
    // padding: '0.5em'
  },
  word: {
    fontSize: '2em',
    textTransform: 'uppercase'
  }
}))

export const Race = () => {
  const classes = useStyles()

  const items = [
    {
      s: clsx(s.rectButton),
      value: '3',
      label: 'LEVEL',
      classes
    },
    {
      s: clsx(s.rectButton, s.trapButton),
      value: '420',
      label: 'SCORE',
      classes
    },
    {
      s: clsx(s.rectButton, s.paraButton),
      value: '4X',
      classes
    }
  ]
  const sentence = 'and and and and and and and and and and and and'

  return <main className={classes.content}>
    <div className={classes.boardWrapper}>
      <Grid container direction='column'>
        <Grid container direction='row'
          justifyContent='center'>
            {items.map(item => <Grid container item xs={4} justifyContent='center'>
              <Panel
                key={item.label || 'multiplier'}
                s={item.s}
                value={item.value}
                label={item.label}
                classes={item.classes} />
            </Grid>)}
        </Grid>
        <StackStace
          classes={classes}
          words={words(sentence)} />
        <Grid container>
          <Grid></Grid>
          <Grid></Grid>
          <Grid></Grid>
        </Grid>
      </Grid>
    </div>
  </main>
}

export default Race
