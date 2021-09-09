import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Info } from '@material-ui/icons'
import * as s from '../styles/nav.module.css'
import { Button } from '../utils/Buttons'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    border: 'none',
    boxShadow: 'none',
    height: '100vh',
    
  },
  callToAction: {
    height: '100vh',
    border: 'none',
    boxShadow: 'none'
    // background: 'radial-gradient(ellipse at center, #FBF9FA, #241F20)'
  },
  mainrapper: {
    border: 'solid red thin',
    padding: theme.spacing(5)
  },
  descWrapper: {
    border: 'solid green thin'
  },
  infoWrapper: {
    border: 'solid blue thin'
  },
  descText: {
    marginTop: '3em'
  }
}))
export const Home = () => {
  const classes = useStyles()

  return <main className={classes.content}>
    <div className={s.homeWrapper}>
      <Grid container item
        className={classes.mainrapper}>
        <Grid
          item
          direction='column' xs={8}
          className={classes.descWrapper}>
          <Grid
            className={s.racetext}
            container item
            justifyContent='center'>
            WORD RACE
          </Grid>
          <Grid conatiner item className={classes.descText}>
            <Typography component='p' variant='body1'>
              {`Word Race is a game designed to improve QWERTY typing rate and efficiency.
              Start Playing now to improve your typing speed and strack your score.
              And did I forget to mention it's all for free? :)`}
            </Typography>
          </Grid>
          <Grid item container justifyContent='center'>
            <Button label='Start Playing Now' />
          </Grid>
        </Grid>
        <Grid item xs={4}
          className={classes.infoWrapper}>
          <Box>
            <Grid>
              <Info />
              <Typography>
                How to play
              </Typography>
            </Grid>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim debitis quo mollitia cupiditate, natus voluptas architecto dolores quasi aut, veniam, exercitationem recusandae labore rem quibusdam eum impedit iure voluptatum fuga!
            </Typography>
            <Typography>
              Bonus
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ea nesciunt, culpa minima voluptatibus ratione eum quam maiores vel, quas ipsa temporibus explicabo omnis magni! Commodi adipisci aliquid facilis cumque?
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  </main>
}

export default Home
