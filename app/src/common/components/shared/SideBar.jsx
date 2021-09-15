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
import PropTypes from 'prop-types'
import { DirectionsRun } from "@mui/icons-material"
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

const Item = ({
  href, primary, tab, selectedTab, onTabChange,
  Icon
}) => {
  const classes = useStyles()

  return <Link href={href || ''} passHref>
    <ListItem
      button
      component='a'
      classes={{root: clsx({
        [classes.listItem]: selectedTab===tab
      }) }}
      onClick={() => onTabChange(tab)}
    >
      <ListItemIcon>
        <Icon fontSize='medium' color='primary' />
      </ListItemIcon>
      <ListItemText
        classes={{primary: classes.listIconLabels}}
        primary={primary} />
    </ListItem>
  </Link>
}

export const SideBar = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const {tab:SelectedTab, setTab } = useAppContext()

  const tabs = [
    {
      href: '/',
      primary: 'Home',
      tab: 'home',
      Icon: Home
    },
    {
      href: '/race',
      primary: 'Race',
      tab: 'race',
      Icon: DirectionsRun
    },
    {
      href: '/profile',
      primary: 'My Account',
      tab: 'profile',
      Icon: AccountBox
    },
    {
      href: '/topscorers',
      primary: 'Top Scorers',
      tab: 'topscorers',
      Icon: PersonalVideo
    }
  ]

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
        {tabs.map(t => <Item
          key={t.tab}
          href={t.href}
          primary={t.primary}
          tab={t.tab}
          selectedTab={SelectedTab}
          onTabChange={handleTabChange}
          Icon={t.Icon} />)}
      </List>
    </Drawer>
  </>
}

Item.propTypes = {
  href: PropTypes.string,
  primary: PropTypes.string,
  tab: PropTypes.string,
  selectedTab: PropTypes.string,
  onTabChange: PropTypes.func,
  Icon: PropTypes.shape({
    $$typeof: PropTypes.symbol,
    type: PropTypes.shape({
      $$typeof: PropTypes.symbol,
      render: PropTypes.func
    })
  })
}

export default SideBar
