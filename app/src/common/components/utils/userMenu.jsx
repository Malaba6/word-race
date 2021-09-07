import { useState } from 'react'
import {
  IconButton, Menu, MenuItem, Collapse,
  makeStyles, ListItemIcon, ListItemText, Typography,
  Grid, Avatar, List, ListItem
 } from '@material-ui/core'
import { Person as PersonIcon, AccountCircleRounded,
  ExitToApp, AccountCircle
} from '@material-ui/icons'
import PropTypes from 'prop-types'
import useViewport from '../hooks/viewport'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3.5em'
  },
  icon: {
    marginLeft: '0.5em',
    borderRadius: '0'
  },
  menuFontSize: {
    fontSize: theme.palette.text.menu
  },
  profileWraper: {
    display: 'flex',
    padding: theme.spacing(0,1)
  },
  menuIconSize: {
    fontSize: '4rem'
  }
}))

export const UserMenu = ({ userName='Guest', avatar }) => {
  const isMobileView = useViewport()

  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDeskTopView = 
    <>
      <IconButton
        className={classes.icon}
        aria-controls='user-menu'
        aria-haspopup='true'
        onClick={handleClick}>
          {avatar
            ? <Avatar alt='Avatar' src={avatar} />
            : <AccountCircleRounded fontSize='large' />}
          { userName || 'Guest' }
      </IconButton>
      <Collapse timeout={2000} in={Boolean(anchorEl)}>
        <Menu
          id='user-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          className={classes.root}
          onClose={handleClose}>
            <MenuItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            
            <MenuItem>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Menu>
      </Collapse>
    </> 

  const getMobileView = 
    <>
      <Grid
        container
        direction='column'
        spacing={3}
        justifyContent='center'>
        <Grid justifyContent='center' className={classes.profileWraper}>
          {avatar
            ? <Avatar alt='Avatar' src={avatar} />
            : <AccountCircleRounded fontSize='large' classes={{fontSizeLarge: classes.menuIconSize}} /> }
        </Grid>
        <Grid justifyContent='center' className={classes.profileWraper}>
          <Typography>
            {userName}
          </Typography>
        </Grid>
      </Grid>
      <List>
        <ListItem>
          <ListItemIcon>
            <PersonIcon fontSize='large' color='primary' />
          </ListItemIcon>
          <ListItemText
            classes={{primary: classes.menuFontSize}}
            primary='Profile' />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ExitToApp fontSize='large' color='primary' />
          </ListItemIcon>
          <ListItemText
            classes={{primary: classes.menuFontSize}}
            primary='Logout' />
        </ListItem>
      </List>
    </>
  return isMobileView ? getMobileView : getDeskTopView
}