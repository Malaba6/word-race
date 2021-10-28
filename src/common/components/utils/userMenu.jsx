/* eslint-disable no-undef */
import { useState } from 'react'
import {
  IconButton, Menu, MenuItem, Collapse,
  makeStyles, ListItemIcon, ListItemText, Typography,
  Grid, Avatar, List, ListItem
 } from '@material-ui/core'
 import { useRouter } from 'next/router'

import { Person as PersonIcon, AccountCircleRounded,
  ExitToApp
} from '@material-ui/icons'
// import PropTypes from 'prop-types'
import { useViewport } from '../hooks/viewport'
import { useAuth } from '../../../context/AuthContext'
import notify, { Toast } from '../shared/Toaster'

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

export const UserMenu = ({ username='Guest', avatar }) => {
  const isMobileView = useViewport()
  const { state: { isAuthenticated }, dispatch} = useAuth()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token')

    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`
      + '/api/auth/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': '*',
        authorization: token
      },
    })
    const response = await result.json()
    if (response.message) {
      dispatch({
        type: 'SUCCESS',
        payload: {user: {}, error: null, isAuthenticated: false}
      })
      localStorage.setItem('token', null)
      localStorage.setItem('user', null)
      notify('You are successfully logged out!', 'success')
      router.push('/login')
    } else {
      notify(response.error ? response.error : 'Network error!', 'error')
    }
  }

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
          { username || 'Guest' }
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
            
            {isAuthenticated && <MenuItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>}
        </Menu>
      </Collapse>
      <Toast />
    </> 

  const getMobileView = 
    <>
      <Grid
        container
        direction='column'>
        <Grid container item justifyContent='center' className={classes.profileWraper}>
          {avatar
            ? <Avatar alt='Avatar' src={avatar} />
            : <AccountCircleRounded
              fontSize='large'
              classes={{fontSizeLarge: classes.menuIconSize}} /> }
        </Grid>
        <Grid container item justifyContent='center' className={classes.profileWraper}>
          <Typography>
            {username}
          </Typography>
        </Grid>
      </Grid>
      <List>
        <ListItem>
          <ListItemIcon>
            <PersonIcon fontSize='medium' color='primary' />
          </ListItemIcon>
          <ListItemText
            classes={{primary: classes.menuFontSize}}
            primary='Profile' />
        </ListItem>
        {isAuthenticated && <ListItem>
          <ListItemIcon>
            <ExitToApp fontSize='medium' color='primary' />
          </ListItemIcon>
          <ListItemText
            classes={{primary: classes.menuFontSize}}
            primary='Logout' />
        </ListItem>}
      </List>
      <Toast />
    </>
  return isMobileView ? getMobileView : getDeskTopView
}

export default UserMenu
