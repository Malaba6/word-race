import {
  Card, Grid, Container, Typography, IconButton
} from "@material-ui/core"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { Info, Close } from "@material-ui/icons"
import PropTypes from "prop-types"

const useStyles = makeStyles(() => ({
  infoWrapper: {
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
    paddingBottom: '1em',
    margin: 0
  },
  howToPlayTitle: {
    marginBottom: '1em'
  },
  hideInfoOnMobile: {
    '@media (max-width: 900px)': {
      display: 'none'
    }
  },
  closeBtn: {
    justifyContent: 'flex-end',
  }
}))

const HowToPlay = ({
  xs, isHiden, setAnchorEl, hasClose, setOpen
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  return <Grid item xs={xs}
    className={clsx(classes.infoWrapper, {
      [classes.hideInfoOnMobile]: isHiden
    })}>
    <Card className={classes.infoCard}>
      <Container>
        <Grid container 
          className={classes.howToPlayTitle}>
          <Grid item container xs={3}
            justifyContent='flex-start' alignItems='center'>
            <Info />
          </Grid>
          <Grid container item xs={6}
            justifyContent='center' alignItems='center'>
            <Typography variant='h5' component='h6'>
              How to play
            </Typography>
          </Grid>
          <Grid item container xs={3} className={classes.closeBtn}>
            {hasClose && <IconButton onClick={handleClose}>
              <Close fontSize='large' />
            </IconButton>}
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
}

HowToPlay.propTypes = {
  xs: PropTypes.number,
  isHiden: PropTypes.bool,
  setAnchorEl: PropTypes.func,
  hasClose: PropTypes.bool,
  setOpen: PropTypes.func
}

export default HowToPlay
