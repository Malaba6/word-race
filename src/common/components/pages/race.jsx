/* eslint-disable no-param-reassign */
import {
  Grid
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import clsx from 'clsx'
import {
  Panel, StackSpace, arrayToObject as words,
  KeyBoard, Config
} from "../utils/panel"
import { keys, sentences } from "../utils/constants"
import * as s from '../styles/home.module.css'


const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: '5em',
    minHeight: '100vh',
    width: '100%'
  },
  boardWrapper: {
    padding: theme.spacing(5),
    '@media (max-width: 900px)': {
      padding: theme.spacing(1),
    }
  },
  rectButton: {
    width: 'fit-content',
  },
  levelText: {
    fontSize: '0.8rem',
    fontWeight: 'bolder',
    '@media (max-width: 900px)': {
      fontSize: '0.3rem'
    }
  },
  text: {
    '@media (max-width: 900px)': {
      fontSize: '0.7rem'
    }
  },
  howToPlay: {
    float: 'right'
  },
  stackTrace: {
    margin: '0 auto',
    marginTop: '2em',
    width: '80%',
    padding: '1em',
    paddingTop: 0,
    paddingRight: 0,
    background: theme.palette.secondary.menu,
    borderRadius: '5px',
    minWidth: '300px',
    boxShadow: theme.shadows[3],
    '@media (max-width: 900px)': {
      width: '100%',
      paddingRight: '0.5em',
      paddingLeft: '0.5em',
    }
  },
  wordContainer: {
    border: `solid 2px ${theme.palette.text.dark}`,
    margin: '0.25em',
    borderRadius: '3px',
    background: '#fff',
    color: theme.palette.text.dark,
  },
  word: {
    fontSize: '2rem',
    textTransform: 'uppercase',
    '@media (max-width: 900px)': {
      fontSize: '0.6rem'
    }
  },
  underline: {
    bottom: '0.5em',
    position: 'absolute',
    borderBottom: `solid ${theme.palette.text.dark} 2px`,
    width: '1rem',
    '@media (max-width: 900px)': {
      width: '0.6em',
      bottom: '0.4em'
    }
  },
  key: {
    borderRadius: '4px',
    position: 'relative',
    display: 'flex',
    boxShadow: theme.shadows[3],
    color: theme.palette.text.dark,
    justifyContent: 'center', 
    padding: '0.5em',
    paddingLeft: '0.7em',
    paddingRight: '0.7em',
    textTransform: 'uppercase',
    '@media (max-width: 900px)': {
      borderRadius: '2px',
    }
  },
  keyBoard: {
    margin: '0 auto',
    marginTop: '1em',
    width: '100%',
    padding: '1.5em',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
      paddingRight: 0,
    }
  },
  row: {
    margin: '0 auto',
    '@media (max-width: 900px)': {
      width: '100%',
      margin: '0 auto',
    }
  },
  keyLabel: {
    '@media (max-width: 900px)': {
      fontSize: '1.2rem'
    }
  },
  configWrapper: {
    background: theme.palette.secondary.menu,
    borderRadius: '4px',
    width: '80%',
    margin: '0 auto',
    marginBottom: '3em',
    padding: '1em',
    boxShadow: theme.shadows[3],
    '@media (max-width: 900px)': {
      width: '100%',
    }
  },
  formControl: {
    margin: theme.spacing(1),
    width: '80%',
    '@media (max-width: 900px)': {
      width: '100%',
    }
  },
  select: {
    padding: '0.5em',
  },
  icon: {
    color: 'green',
    paddingBottom: '2em',
  },
  selectWrapper: {
    background: 'rgb(59, 59, 59, 0.5)',
    borderRadius: '4px',
    fontSize: '1.2rem',
  },
  title: {
    '@media (max-width: 900px)': {
      fontSize: '0.9rem',
      marginTop: '0.2em'
    },
    '@media (max-width: 400px)': {
      display: 'none'
    }
  },
  popover: {
    width: '50%',
    '@media (max-width: 400px)': {
      width: '100%'
    }
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

  return <main className={classes.content}>
    <div className={classes.boardWrapper}>
      <Config classes={classes} />
      <Grid container direction='column'>
        <Grid
          container direction='row'
          className={classes.board}
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
        <StackSpace
          classes={classes}
          words={words(sentences[0])} />
        <KeyBoard
          keys={keys}
          classes={classes}/>
      </Grid>
    </div>
  </main>
}

export default Race
