import {
  Card, CardActions, CardContent, CardHeader, Container,
  Divider, Grid, List, ListItem, ListItemIcon,
  ListItemText, Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Info, StarBorder } from '@material-ui/icons'
import * as s from '../styles/nav.module.css'
import { Button, AuthButton } from '../utils/Buttons'

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
  },
  mainWrapper: {
    padding: theme.spacing(6),
    '@media (max-width: 900px)': {
      padding: theme.spacing(0,1)
    }
  },
  descWrapper: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(7),
    '@media (max-width: 900px)': {
      paddingLeft: 0,
      paddingRight: 0,
    }
  },
  infoWrapper: {
    paddingRight: theme.spacing(3),
    '@media (max-width: 900px)': {
      display: 'none'
    }
  },
  descText: {
    marginTop: '3em'
  },
  description: {
    fontSize: '1.2em'
  },
  infoCard: {
    background: 'linear-gradient(to left, #FBF9FA, #989595)',
    paddingTop: '1em',
    paddingBottom: '1em'
    // color: '#fff'
  },
  startPlayingBtn: {
    marginTop: '1em'
  },
  buttonFont: {
    fontSize: '0.8rem',
    color: '#C4C4C4',
    marginTop: '0.5em',
    marginLeft: '1em'
  },
  benefits: {
    paddingTop: '8em'
  },
  howToPlayTitle: {
    marginBottom: '1em'
  },
  actionBtns: {
    display: 'flex',
    '@media (max-width: 900px)': {
      flexDirection: 'column'
    }
  }
}))
export const Home = () => {
  const classes = useStyles()

  return <main className={classes.content}>
    <div className={s.homeWrapper}>
      <Grid container item
        className={classes.mainWrapper}>
        <Grid
          item
          direction='column' xs={12} sm={12} md={8}
          className={classes.descWrapper}>
          <Grid
            className={s.racetext}
            container item
            // justifyContent='center'
            >
            WORD RACE
          </Grid>
          <Grid container item className={classes.descText}>
            <Typography component='p' variant='body1'
              className={classes.description}>
              {`Word Race is a game designed to improve QWERTY typing rate and efficiency.
              Start Playing now to improve your typing speed and strack your score.
              And did I forget to mention it's all for free? :)`}
            </Typography>
          </Grid>
          <Grid item container
            className={classes.startPlayingBtn}
          >
            <Button label='Start Playing Now' href='/race' />
          </Grid>
          <Grid className={classes.benefits}>
            <Card>
              <CardHeader
                style={{textAlign: 'center'}}
                title='Benefits' />
              <Divider />
              <CardContent>
              <Container>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                      primary="It's free! Every body loves free stuff, don't we?" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                      primary="Highly customisable.
                      You can change the pace of the game, the stack trace and more" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                      primary="Easy to play!" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                      primary="Very satisfying" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                      primary="Save your Score and Track your progress by
                      Creating an account Now" />
                  </ListItem>
                </List>
              </Container>
              </CardContent>
              <CardActions className={classes.actionBtns}>
                <Grid container direction='column' alignContent='center'>
                  <AuthButton classes={{root: classes.btns}} label='Login' />
                  <Typography variant='body2'
                    className={classes.buttonFont}>
                      Already have an account?
                  </Typography>
                </Grid>
                <Grid container direction='column' alignContent='center'>
                  <AuthButton label='Sign Up' />
                  <Typography variant='body2'
                    className={classes.buttonFont}>
                    Create account
                  </Typography>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4}
          className={classes.infoWrapper}>
          <Card className={classes.infoCard}>
            <Container>
              <Grid container 
                className={classes.howToPlayTitle}>
                <Grid xs={4}>
                  <Info />
                </Grid>
                <Grid container xs={8}>
                  <Typography variant='h5' component='h6'>
                    How to play
                  </Typography>
                </Grid>
              </Grid>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim debitis quo mollitia cupiditate, natus voluptas architecto dolores quasi aut, veniam, exercitationem recusandae labore rem quibusdam eum impedit iure voluptatum fuga!
              </Typography>
              <Typography variant='h6' component='h6'>
                Bonus
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ea nesciunt, culpa minima voluptatibus ratione eum quam maiores vel, quas ipsa temporibus explicabo omnis magni! Commodi adipisci aliquid facilis cumque?
              </Typography>
            </Container>
          </Card>
        </Grid>
      </Grid>
    </div>
  </main>
}

export default Home
