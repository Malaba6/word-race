/* eslint-disable react/no-array-index-key */
import { useState } from "react"
import {
  Grid, Typography, ListSubheader, Container, Popover,
  FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip,
 } from "@material-ui/core"
 import clsx from 'clsx'
import { HelpOutline } from "@material-ui/icons"
import PropTypes from "prop-types"
import useSound from "use-sound"
import { configItems } from "./constants"
import HowToPlay from "../shared/HowToPlay"
import useKeyPress from '../hooks/keyPress'
import { useTyping } from '../../../context/TypingContext'

export const Panel = ({
  s, value, label, classes
}) => <div className={s}>
  <Grid container item direction='column' justifyContent='center'>
    <Grid container item justifyContent='center'>
      <Typography className={classes.text} variant='h4' component='h5'>
        {value}
      </Typography>
    </Grid>
    {label && <Grid container item justifyContent='center'>
        <Typography variant='body2'
          className={classes.levelText}
          component='h5'>
          {label}
        </Typography>
      </Grid>}
  </Grid>
</div>

/**
 * 
 * @param {String} sentence Accepts a sentence and
 * @returns {Array} of Objects containing word id and value
 */
export const arrayToObject = (sentence) => {
  const words = sentence?.split(' ')
  let count = 0
  const newWords = []

  words?.forEach(word => {
    count += word.length
    if (count < 32) newWords.push(word)
  })

  return newWords?.map((e, i) => ({
    id: i,
    value: e
  }))
}

const WordToLetters = ({
  word, classes, toType, index, wordFinished, ids:id
}) => <Typography className={classes.word}>
      {word.split('').map((letter, i) => 
        <span
          key={`${letter}${i}`}
          className={clsx({
            [classes.typedKeys]: toType.indexOf(word) === 0
            && id === 0
            && i <= index - 1,
            [classes.wordFinished]: toType.indexOf(word) === 0
            && id === 0
            && wordFinished
        })}>
          {letter}
        </span>)}
    </Typography>

export const StackSpace = ({
  classes
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(true)
  const { state: 
    { index, toType, wordFinished }
  } = useTyping()
  const words = arrayToObject(toType)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  };

  const id = open ? 'how-to-play' : undefined;

  return <Grid container>
    <div className={classes.stackTrace}>
      <div>
        <Tooltip title='How To Play' placement='top'>
          <IconButton
            onClick={handleClick}
            aria-describedby={id}
            className={classes.howToPlay}>
            <HelpOutline color='secondary' fontSize='large' />
          </IconButton>
        </Tooltip>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          classes={{paper: classes.popover}}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <div style={{border: ''}}>
            <HowToPlay
              hasClose
              setAnchorEl={setAnchorEl}
              setOpen={setOpen}
              handleClose={handleClose} />
          </div>
        </Popover>
      </div>
      <Grid container item direction='row' spacing={2}>
        {words.map(word => 
          <Grid key={word.id}
            className={classes.wordContainer} container item
            justifyContent='center'
            >
              <WordToLetters
                classes={classes}
                index={index}
                toType={toType}
                wordFinished={wordFinished}
                ids={word.id}
                word={word.value} />
          </Grid>
        )}
      </Grid>
    </div>
  </Grid>
}

export const KeyBoard = ({
  classes, keys
}) => {
  const row1 = keys.slice(0, 10)
  const row2 = keys.slice(10, 19)
  const row3 = keys.slice(19, 28)
  const { state:
    { isTargetPressed, keyPressed, keyTarget }
  } = useTyping()

  useKeyPress()

  const row = (roKeys) => <Grid container item
    direction='row'
    spacing={2}
    className={classes.row}
    alignItems='center'
    justifyContent='center'
    >
    {roKeys.map(ro => <Grid container item xs={1}
      style={{ padding: '1em' }}
      justifyContent='center'
      key={ro.id}>
        {ro.id !== 27
        ? <Container className={clsx(classes.key, {
          [classes.targetKey]: ro.label === keyTarget?.toLowerCase(),
          [classes.wrongKey]: ro.label === keyPressed?.toLowerCase()
            && !isTargetPressed
        })}>
            <Typography
              variant='h4'
              component='h4'
              className={classes.keyLabel}>
              {ro.label}
            </Typography>
            {['f', 'j'].indexOf(ro.label) !== -1
              && <div className={classes.underline} />}
          </Container>
        : ''
          }
    </Grid>)}
  </Grid>

  return <Grid container>
    <div className={classes.keyBoard}>
      <Grid container item direction='column'>
        {row(row1)}
        {row(row2)}
        {row(row3)}
      </Grid>
    </div>
  </Grid>
}

const ConfigMenu = ({
  classes, item, handleChange
}) => {
  const { Icon, name, readOnly } = item
  const {state: { level }} = useTyping()

  return <Grid container item md={4} xs={12} justifyContent='flex-start' >
    <FormControl className={classes.formControl}>
      <InputLabel
        className={classes.icon}
        style={{color: item.color}}
        htmlFor="grouped-select">
        <Grid container direction='row' style={{ overflow: 'hidden'}}>
          <Icon />
          <Typography
            style={{ overflow: 'hidden'}}
            className={classes.title}>
              {item.title}
            </Typography>
        </Grid>
      </InputLabel>
      <Select defaultValue={1} id="grouped-select"
        classes={{
          select: classes.select,
        }}
        value={level}
        inputProps={{
          name,
          readOnly 
        }}
        onChange={handleChange}
        style={{ marginTop: '2em'}}
        className={classes.selectWrapper} >
          {item.options.map(option => option.values.map((val, i) => 
              i === 0 
              ? <ListSubheader key={val} style={{color: item.color}}>
                  {val}
                </ListSubheader>
              : <MenuItem value={val.id} key={val.id}>
                  {val.label}
                </MenuItem>
            ))
          }
      </Select>
    </FormControl>
  </Grid>
}

export const Config = ({
  classes,
}) => {
  const { state, setState } = useTyping()
  const [play] = useSound('/menu.mp3', {
    volume: 0.15
  })

  const handleChange = (e) => {
    let stack
    let speed
    switch (e.target.value || '') {
      case '1':
        stack = 20
        speed = 2
        break;
      case '3':
        stack = 40
        speed = 0
        break
      default:
        stack = 30
        speed = 1
    }
    setState({
      ...state,
      level: e.target.value,
      stack,
      speed
    })
    play()
  }

  return <Grid container
    className={classes.configWrapper}>
    {configItems.map(item => 
      <ConfigMenu 
        item={item}
        classes={classes}
        handleChange={handleChange} />)}
  </Grid>
}

Panel.propTypes = {
  s: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
}
Panel.defaultProps = {
  label: ''
}
StackSpace.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string)
}

WordToLetters.propTypes = {
  ids: PropTypes.number,
  classes: PropTypes.objectOf(PropTypes.string),
  word: PropTypes.string,
  wordFinished: PropTypes.bool, 
  toType: PropTypes.string,
  index: PropTypes.number

}
KeyBoard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  keys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string
  }))
}
Config.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
}
ConfigMenu.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  handleChange: PropTypes.func,
  item: PropTypes.shape({
    name: PropTypes.string,
    readOnly: PropTypes.bool,
    Icon: PropTypes.shape({
      $$typeof: PropTypes.symbol,
      type: PropTypes.shape({
        $$typeof: PropTypes.symbol,
        render: PropTypes.func
      })
    }),
    color: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes
      .arrayOf(PropTypes.oneOfType([
        PropTypes.string, PropTypes.shape({
          id: PropTypes.string,
          lebel: PropTypes.string 
        })
    ]))))
  })
}
