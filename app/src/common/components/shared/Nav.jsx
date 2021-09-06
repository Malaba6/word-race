import { useState } from 'react'
import Proptypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  Slide,
  Button,
  makeStyles,
  Grid,
  IconButton,
  Drawer,
  Link,
  MenuItem
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
// import RouterLink from "next/Link"
import Image from 'next/image'
import * as s from '../styles/nav.module.css'
import logo from '../../../../public/logo.png'
import { useViewport } from '../hooks/viewport'

const HideOnScroll = ({ children, window }) => {
  const trigger = useScrollTrigger({ target: window });
  return <Slide appear={false} direction='down' in={!trigger}>
    {children}
  </Slide>
}
const useStyles = makeStyles(() => (
  {
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
      width: '20em',
      alignItems: 'center'
    },
    donateButton: {
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
    }
  }
))

export const Nav = (props) => {
  const {
    menuButton, toolBar, logo: wRaceLogo, logoFrame,
    donateButton, drawerContainer, mobileOption
   } = useStyles();

  const headers = [
    {
      label: 'About Us',
      href: '/aboutus'
    },
    {
      label: 'Our Programmes',
      href: '/programmes'
    },
    {
      label: 'Get Involved',
      href: '/getinvolved'
    },
    {
      label: 'Blog',
      href: '/blog'
    },
    {
      label: 'Contact Us',
      href: '/contactus'
    },
    {
      label: 'Donate',
      href: '/donate',
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
      className={logoFrame}>
      <Grid item xs={3}>
        <div className={wRaceLogo}>
          <Image
            alt='Logo'
            border
            src={logo} />
        </div>
      </Grid>
      <Grid item xs={9}>
        <Grid className={s.logotext}>
          {'Word'}
        </Grid>
        <Grid className={s.logotext}>
          {'Race'}
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
      <Drawer
        {...{
          anchor: 'right',
          open: isDrawerOpen,
          onClose: handleDrawerClose
        }}>
        <div className={drawerContainer}>{getDrawerChoices()}</div>
      </Drawer>
    </Toolbar>
  }

  const getMenuButtons = () => {
    return <div>
      {headers.map(({label, href}) => {
      return label !== 'Donate'
        ? <Button disableRipple disableFocusRipple key={label}
            {...{
              color: 'inherit',
              className: menuButton,
              to: href,
              // component: RouterLink
            }}>
              {label}
          </Button>
        : <Button key={label}
            {...{
              color: 'secondary',
              className: donateButton,
              to: href,
              variant: 'outlined'
            }} >
              {label}
          </Button>
    })}
    </div>
  }

  const getDrawerChoices = () => {
    return headers.map(({label, href}) => {
      return label !== 'Donate'
        ? <Link key={label}
            {...{
              color: 'inherit',
              to: href,
              style: { textDecoration: 'none'},
              // component: RouterLink
            }}>
              <MenuItem className={mobileOption}>{label}</MenuItem>
          </Link>
        : <Button key={label}
            {...{
              color: 'secondary',
              className: donateButton,
              to: href,
              variant: 'outlined'
            }} >
              {label}
          </Button>
    })
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
