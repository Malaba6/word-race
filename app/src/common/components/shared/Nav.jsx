import { useState } from 'react'
import Proptypes from 'prop-types'
import {
  AppBar, Toolbar, CssBaseline, useScrollTrigger,
  Slide, Button, makeStyles, Grid, IconButton,
  Drawer, Link, MenuItem, useTheme, Divider,
  ListItemText, List, ListItem, ListItemIcon
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  ChevronLeft, Info,
  ChevronRight, DirectionsCar
} from '@material-ui/icons'
// import RouterLink from "next/Link"
import Image from 'next/image'
import * as s from '../styles/nav.module.css'
import logo from '../../../../public/logo.png'
import { useViewport } from '../hooks/viewport'
import { AuthButton } from '../utils/Buttons'
import { UserMenu } from '../utils/userMenu'
import theme from '../../../../styles/theme'

const HideOnScroll = ({ children, window }) => {
  const trigger = useScrollTrigger({ target: window });
  return <Slide appear={false} direction='down' in={!trigger}>
    {children}
  </Slide>
}
const useStyles = makeStyles(() => (
  {
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
    },
    drawerPaper: {
      width: '70%',
      background: theme.palette.primary.secondary,
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
    authButton, drawerContainer, mobileOption,
    logoTextWrapper, drawer, drawerPaper,
    drawerHeader, fontSizeText
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

  const avatar = () => {
    return <Grid
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
      <Grid item xs={9} className={logoTextWrapper} alignItems='flex-start'>
        <Grid className={s.logotext}>
          {'WORD RACE'}
        </Grid>
      </Grid>
    </Grid>
  }

  const displayDesktop = () => {
    return <Toolbar className={toolBar}>
        {avatar()}
        {getMenuButtons()}
      </Toolbar>
  }

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
            {headers.map(({label, href}) =>{
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

  const getMenuButtons = () => {
    return <div>
      {headers.map(({label, href}) => {
        switch(label) {
          case 'Login':
            return <AuthButton label='Login' />
          case 'Sign Up':
            return <AuthButton label='Sign Up' />
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
  }

  return <>
    <CssBaseline />
    <HideOnScroll  {...props}>
      <AppBar>
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
