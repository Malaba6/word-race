import { useState } from "react"
import clsx from 'clsx'
import {
  IconButton, Drawer,
  Divider, List, ListItem,
  ListItemIcon, ListItemText
} from "@material-ui/core"
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import {
  Home, ChevronLeft, ChevronRight,
  AccountBox, PersonalVideo
} from '@material-ui/icons'
import { useAppContext } from "../../../context/Context"

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '@media (max-width: 900px)': {
      zIndex: 1050
    }
  },
  drawerOpen: {
    width: '15%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    paddingTop: '5em',
    '@media (max-width: 900px)': {
      width: '50%'
    }
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    paddingTop: '5em'
  },
  toggler: {
    float: 'right',
    marginRight: '0.5em'
  },
  drawerPaper: {
    background: theme.palette.primary.secondary,
    color: 'inherit',
    '@media (max-width: 900px)': {
      zIndex: 1050
    }
  },
  listIconLabels: {
    color: '#fff'
  },
  listItem: {
    borderLeft: '#fff solid 5px',
    background: '#4C4C4C'
  }
}))

export const SideBar = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const {tab:SelectedTab, setTab } = useAppContext()

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleTabChange = (tab) => {
    setTab(tab)
  }

  return <>
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerToggle} className={classes.toggler}>
          {open
          ? <ChevronLeft fontSize='large' color='primary' />
          : <ChevronRight fontSize='large' color='primary' />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link href='/' passHref>
          <ListItem
            button
            component='a'
            classes={{root: clsx({
              [classes.listItem]: SelectedTab==='home'
            }) }}
            onClick={() => handleTabChange('home')}
          >
            <ListItemIcon>
              <Home fontSize='medium' color='primary' />
            </ListItemIcon>
            <ListItemText classes={{primary: classes.listIconLabels}} primary='Home' />
          </ListItem>
        </Link>
        <Link href='/profile' passHref>
          <ListItem
            component='a'
            classes={{root: clsx({
              [classes.listItem]: SelectedTab==='profile'
            }) }}
            onClick={() => handleTabChange('profile')}
            button>
            <ListItemIcon>
              <AccountBox fontSize='medium' color='primary' />
            </ListItemIcon>
            <ListItemText classes={{primary: classes.listIconLabels}} primary='My Account' />
          </ListItem>
        </Link>
        <Link href='/account' passHref>
          <ListItem
            component='a'
            classes={{root: clsx({
              [classes.listItem]: SelectedTab==='account'
            }) }}
            onClick={() => handleTabChange('account')}
            button >
            <ListItemIcon>
              <PersonalVideo fontSize='medium' color='primary' />
            </ListItemIcon>
            <ListItemText classes={{primary: classes.listIconLabels}} primary='Top Scorers' />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  </>
}

export default SideBar
