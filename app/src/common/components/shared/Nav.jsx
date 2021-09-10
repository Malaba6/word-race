/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import { useState } from 'react'
import Proptypes from 'prop-types'
import {
  AppBar, Toolbar, CssBaseline, useScrollTrigger,
  Slide, Button, makeStyles, Grid, IconButton,
  Drawer, Divider, ListItemText, List, ListItem,
  ListItemIcon
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  ChevronLeft, Info, DirectionsCar
} from '@material-ui/icons'
// import RouterLink from "next/Link"
import Image from 'next/image'
import * as s from '../styles/nav.module.css'
import logo from '../../../../public/logo.png'
import { useViewport } from '../hooks/viewport'
import { AuthButton } from '../utils/Buttons'
import { UserMenu } from '../utils/userMenu'
import {theme} from '../../../../styles/theme'

const HideOnScroll = ({ children, window }) => {
  const trigger = useScrollTrigger({ target: window });
  return <Slide appear={false} direction='down' in={!trigger}>
    {children}
  </Slide>
}
const useStyles = makeStyles(() => (
  {
    root: {
      width: '100%',
      zIndex: '1400',
      '@media (max-width: 900px)': {
        zIndex: '1100'
      }
    },
    logoTextWrapper: {
      paddingLeft: '0.5em',
      top: 0,
      marginTop: '-1.5em'
    },
    menuButton: {
      marginLeft: '1em',
      fontWeight: 'lighter',
      fontSize: '1.1rem',
      '&:hover': {
        backgroundColor: 'transparent',
        color: '#2196f3'
      },
      '@media (max-width: 1160px)': {
        fontSize: '0.7rem',
        marginLeft: '0.5em',
      }
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between',
      // zIndex: '1400'
    },
    logoFrame: {
      width: '15em',
      alignItems: 'center',
    },
    authButton: {
      marginLeft: '1em',
      background: 'secondary',
      color: 'primary',
      fontWeight: 'bolder',
      '@media (max-width: 900px)': {
        width: '90%',
        padding: '1em',
        marginTop: '1em',
      }
    },
    drawerContainer: {
      paddingTop: '1em',
      textAlign: 'center',
    },
    mobileOption: {
      border: 'none',
      borderBottom: '#C4C4C4 thin solid',
      display: 'flex',
      justifyContent: 'center',
      textTransform: 'uppercase',
      padding: '1em 2em'
    },
    drawer: {
      width: '70%',
      flexShrink: 0,
      zIndex: '1500'
    },
    drawerPaper: {
      width: '70%',
      background: theme.palette.secondary.secondary,
      color: '#fff'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    fontSizeText: {
      fontSize: theme.palette.text.menu
    }
  }
))

export const Nav = (props) => {
  const {
    menuButton, toolBar, wRaceLogo, logoFrame,
    logoTextWrapper, drawer, drawerPaper,
    drawerHeader, fontSizeText, root
   } = useStyles()

  const headers = [
    {
      label: 'About',
      href: '/about'
    },
    {
      label: 'Race',
      href: '/race'
    },
    {
      label: 'Sign Up',
      href: '/signup',
    },
    {
      label: 'Login',
      href: '/login',
    }
  ]

  const [state, setState] = useState({
    isDrawerOpen: false
  })

  const { isDrawerOpen } = state;
  const isMobileView = useViewport();

  const avatar = () => <Grid
      container
      alignItems='flex-start'
      className={logoFrame}>
      <Grid item xs={3}>
        <div className={wRaceLogo}>
          <Image
            alt='Logo'
            className={s.logoImg}
            src={logo} />
        </div>
      </Grid>
      <Grid item xs={9} className={logoTextWrapper}>
        <Grid className={s.logotext}>
          WORD RACE
        </Grid>
      </Grid>
    </Grid>
  
  const getMenuButtons = () => <div>
      {headers.map(({label, href}) => {
        switch(label) {
          case 'Login':
            return <AuthButton key={label} label='Login' />
          case 'Sign Up':
            return <AuthButton key={label} label='Sign Up' />
          default:
            return <Button disableRipple disableFocusRipple key={label}
              {...{
                color: 'inherit',
                className: menuButton,
                to: href,
                // component: RouterLink
              }}>
                {label}
            </Button>
        }
      })}
      <UserMenu />
    </div>

  const displayDesktop = () => <Toolbar className={toolBar}>
        {avatar()}
        {getMenuButtons()}
      </Toolbar>

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState(prev => ({...prev, isDrawerOpen: true}))
    const handleDrawerClose = () => 
      setState(prev => ({...prev, isDrawerOpen: false}))

    return <Toolbar className={toolBar}>
      {avatar()}
      <IconButton
        {...{
          edge: 'end',
          color: 'inherit',
          'aria-label': 'menu',
          'aria-haspopup': 'true',
          onClick: handleDrawerOpen
        }}>
        <MenuIcon />
      </IconButton>
      <Drawer className={drawer}
        classes={{
          paper: drawerPaper,
        }}
        {...{
          anchor: 'right',
          open: isDrawerOpen,
          onClose: handleDrawerClose
        }}>
          <div className={drawerHeader}>
            <ChevronLeft onClick={handleDrawerClose} fontSize='large' />
          </div>
          <Divider color='inherit' />
          <UserMenu />
          <Divider />
          <List>
            {headers.map(({label}) =>{
              switch(label) {
              case 'Login':
                return <ListItem key={label}>
                    <AuthButton label='Login' />
                  </ListItem>
              case 'Sign Up':
                return <ListItem key={label}>
                      <AuthButton label='Sign Up' />
                  </ListItem>
              default:
                return <ListItem key={label}>
                  <ListItemIcon>
                    {label === 'About'
                      ? <Info color='primary' fontSize='large' />
                      : <DirectionsCar fontSize='large' color='primary' />}
                  </ListItemIcon>
                  <ListItemText
                    classes={{primary: fontSizeText}}
                    primary={label} />
                </ListItem>
              }
            })}
          </List>
      </Drawer>
    </Toolbar>
  }

  return <>
    <CssBaseline />
    <HideOnScroll  {...props}>
      <AppBar className={root}>
        {isMobileView
          ? displayMobile()
          : displayDesktop()}
      </AppBar>
    </HideOnScroll>
  </>
}

HideOnScroll.propTypes = {
  children: Proptypes.element.isRequired,
  window: Proptypes.any
}

export default Nav;
