/* eslint-disable no-plusplus */
import {
  Grid, Card, CardHeader, Divider, CardContent,
  List, Container, ListItem, ListItemIcon,
  ListItemText, CardActions, Typography, Box,
} from "@mui/material";
import PropTypes from 'prop-types'
import {
  CloudDownloadRounded, ReplayCircleFilledRounded,
} from '@mui/icons-material'
import { makeStyles } from "@material-ui/core/styles";
import {
  ResponsiveContainer, LineChart,
   XAxis, YAxis, Line,
  Tooltip as TTip, CartesianGrid
} from 'recharts'
import { Button } from "./Buttons";
import {
  scoreList, scoreColumns,
  myRecentScores as rows
} from "./constants";
import { ScoreTable } from "./table";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
    boxShadow: theme.shadows[4],
    '@media (max-width: 900px)': {
      width: '98%',
    }
  },
  card: {
    background: 'linear-gradient(to top, #211B1E, #BF6277)',
    color: '#fff',
    paddingBottom: '1em'
  },
  divider: {
    background: '#424242'
  },
  btns: {
    marginRight: '1em'
  },
  listItem: {
    width: '70%',
    margin: '0 auto',
    '@media (max-width: 900px)': {
      width: '100%',
    }
  },
  listItemText: {
    color: '#c4c4c4'
  },
  chartWrapper: {
    width: '80%',
    margin: '0 auto',
    marginTop: '3em',
    marginBottom: '2em',
    '@media (max-width: 900px)': {
      width: '98%',
    }
  },
  tooltip: {
    borderRadius: '0.2em',
    background: '#333',
    color: '#2196f3',
    boxShadow: theme.shadows[4],
    textAlign: 'center',
    paddingLeft: '1em',
    paddingRight: '1em'
  },
  analysisWrapper: {
    '@media (max-width: 900px)': {
      paddingLeft: '1em',
      paddingRight: '1em'
    }
  },
  stats: {
    '@media (max-width: 600px)': {
      fontSize: '0.6rem'
    }
  }
}))

export const RecentScore = () => {
  const classes = useStyles()

  return <Grid className={classes.root}>
    <Card classes={{root: classes.card}}>
      <CardHeader
        sx={{ color: '#fff' }}
        title='Here is your most recent Score' />
      <Divider color='secondary' 
        light classes={{root: classes.divider}} />
      <CardContent>
      <Container>
        <List>
          {scoreList.map(score => {
            const { Icon } = score

            return <ListItem
              key={score.label}
              secondaryAction={
                  <Typography
                    component='h6'
                    sx={{ color: '#fff'}}
                    variant='h6'>{score.value}</Typography>
              }
              className={classes.listItem}
              >
              <ListItemIcon>
                <Icon sx={{ color: '#fff' }} fontSize='large' />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={score.label} />
            </ListItem>
          })}
        </List>
      </Container>
      </CardContent>
      <CardActions className={classes.actionBtns}>
        <Grid container justifyContent='space-evenly'>
          <Button
            style={{marginRight: '1em'}}
            Icon={ReplayCircleFilledRounded}
            href='/race'
            label='Play Again' />
          <Button
            Icon={CloudDownloadRounded}
            label='Save' />
        </Grid>
      </CardActions>
    </Card>
  </Grid>
}

export const LatestScores = () => <ScoreTable
  columns={scoreColumns}
  label='Your Latest Scores'
  rows={rows} />

const Results = ({label, value}) => <Grid
  container sx={{ color: '#2196f3'}}
  item direction='column'>
  <Typography variant='h6' component='h6'>
    {label}
  </Typography>
  <Typography variant='h4' sx={{ color: '#fff'}} component='h4'>
    {value}
  </Typography>
</Grid> 

const Statistics = ({label, value, classes}) => <Grid
  container xs={2} item direction='column' className={classes.stats}>
  <Typography className={classes.stats} variant='body2' sx={{ color: '#2196f3' }}>
    {label}
  </Typography>
  <Typography className={classes.stats} variant='body1' sx={{ color: '#fff' }}>
    {value}
  </Typography>
</Grid>

const CustomTooltip = ({active, payload, label}) => {
  const classes = useStyles()

  if (active) {
    return <div className={classes.tooltip}>
      <h5>{`Speed: ${payload[0].payload.speed} wpm`}</h5>
      <h5>
        {`Time: ${label}s`}
      </h5>
    </div>
  }
  return null
}

export const Analysis = () => {
  const classes = useStyles()
  const data = [
    { speed: 20, time: 2},
    { speed: 32, time: 4},
    { speed: 15, time: 8},
    { speed: 35, time: 12},
    { speed: 40, time: 16},
    { speed: 23, time: 20},
    { speed: 46, time: 24}
  ]
  const results = [
    { label: 'wpm', value: '43' },
    { label: 'acc', value: '80%' },
    { label: 'points', value: '40' }
  ]
  const statistics = [
    { label: 'test type', value: 'english words' },
    { label: 'raw', value: '43' },
    { label: 'characters', value: '125' },
    { label: 'accuracy', value: '80%' },
    { label: 'time', value: '20s' },
    { label: 'bonus points', value: '2' }
  ]

  return <Grid className={classes.chartWrapper}>
    <Box boxShadow={4}
      className={classes.analysisWrapper}
      sx={{ width: '100%', p: 5, pt: 2, bgcolor: '#333', borderRadius: 1 }}>
      <Grid container item sx={{ pb: 4 }}>
        <Typography
          component='h4' variant='h4' color='#fff'>Analysis</Typography>
      </Grid>
      <Grid container>
        <Grid container item xs={2} direction='column'>
          {results.map(r => <Results
            key={r.label}
            label={r.label}
            value={r.value} />)}
        </Grid>
        <Grid container item xs={10} direction='column'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data}>
              <Line type='monotone' dataKey='speed' stroke='#2196f3' />
              <XAxis dataKey='time' axisLine={false} tickLine={false} tickCount={4} />
              <YAxis dataKey='speed' axisLine={false} tickLine={false}  />
              <TTip content={<CustomTooltip />} />
              <CartesianGrid opacity='0.05' />
            </LineChart>
          </ResponsiveContainer> 
        </Grid>
      </Grid>
      <Grid container sx={{ pt: 2}} direction='row'>
        {statistics.map(s => <Statistics
          key={s.label}
          classes={classes}
          label={s.label}
          value={s.value} />)}
      </Grid>
    </Box>
  </Grid>
}

Statistics.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  classes: PropTypes.objectOf(PropTypes.string)
}

Results.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.objectOf(PropTypes.string),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
