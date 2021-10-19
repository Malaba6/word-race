import { useState } from "react"
import {
  Grid, Typography, ListSubheader, Container, Popover,
  FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip,
 } from "@material-ui/core"
import { HelpOutline } from "@material-ui/icons"
import PropTypes from "prop-types"
import { configItems } from "./constants"
import HowToPlay from "../shared/HowToPlay"

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

const xs = (w) => {
  if (w.length > 9)  return 3
  if (w.length > 3) return 2
  return 1
}

export const StackSpace = ({
  classes, words
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div style={{border: ''}}>
            <HowToPlay
              hasClose
              setAnchorEl={setAnchorEl}
              handleClose={handleClose} />
          </div>
        </Popover>
      </div>
      <Grid container item direction='row' spacing={2}>
        {words.map(word => 
        <Grid key={word.id}
          className={classes.wordContainer} container item
          xs={xs(word.value)} justifyContent='center'>
          <Typography className={classes.word}>
            {word.value}
          </Typography>
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
        ? <Container className={classes.key}>
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
  classes, item, st, handleChange
}) => {
  const { Icon } = item

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
        // disabled={item.disabled}
        value={st.level}
        inputProps={{
          name: 'level'
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
  const [state, setState] = useState({})

  const handleChange = (e) => {
    const { name } = e.target

    setState({
      ...state,
      [name]: e.target.value
    })
  }

  return <Grid container
    className={classes.configWrapper}>
    {configItems.map(item => 
      <ConfigMenu 
        item={item}
        st={state}
        classes={classes}
        handleChange={handleChange} />)}
  </Grid>
}

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
StackSpace.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string
  }))
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
  st: PropTypes.objectOf(PropTypes.string),
  handleChange: PropTypes.func,
  item: PropTypes.shape({
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
