import { useState } from "react"
import {
  Grid, Typography, TableContainer,
  Table, TableHead, TableRow, TableBody, Toolbar, 
  Box, Paper, TableCell, Tooltip, IconButton, TableSortLabel,
  Popover, Container, Card, CardMedia
} from "@mui/material"
import { makeStyles } from "@material-ui/core"
import {
  FilterList, EventNoteRounded, CancelRounded
} from '@mui/icons-material'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import { users } from "./constants"
import {useViewport} from "../hooks/viewport"

export const stableSort = (arr, comparator) => {
  const stabilizedThis = arr.map((e, i) => [e, i])
  stabilizedThis.sort((a,b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(e => e[0])
}

const descComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1
  if (b[orderBy] > a[orderBy]) return 1
  return 0
}

export const getComparator = (order, orderBy) => order === 'desc'
  ? (a, b) => descComparator(a, b, orderBy)
  : (a, b) => -descComparator(a, b, orderBy)

  const useStyles = makeStyles((theme) => ({
    scoresTable: {
      width: '80%',
      margin: '0 auto',
      marginTop: '3em',
      '@media (max-width: 900px)': {
        width: '98%',
      }
    },
    th: {
      color: '#2196f3',
    },
    active: {},
    tableRow: {
      marginTop: 0,
      marginBottom: 0,
      width: '100%',
      '&&:hover': {
        boxShadow: theme.shadows[4]
      }
    },
    cardContainer: {
      width: '35em',
      padding: '0.4em',
      '@media (max-width: 500px)': {
        width: '100%',
      }
    },
    details: {
      '@media (max-width: 500px)': {
        fontSize: '0.8rem',
      }
    }
  }))

  const TableToolbar = ({ label }) => 
    <Toolbar sx={{
      pl: {sm: 2},
      pr: {xs: 1, sm: 1},
      bgcolor: '#555',
      color: '#2196f3'
    }}>
      <EventNoteRounded />
      <Typography sx={{
          flex: '1 1 100%',
        }}
        variant='h6'
        component='div'
        style={{marginLeft: '0.5em'}}
      >
        {label}
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterList sx={{ color: '#2196f3' }} />
        </IconButton>
      </Tooltip>
  </Toolbar>

const EnhancedTableHead = ({
  order, orderBy, onRequestSort, columns
}) => {
  const classes = useStyles()
  const createSortHandler = (property) => (e) => 
    onRequestSort(e, property)
  
  return <TableHead>
    <TableRow>
      {columns.map(col => <TableCell
        align={col.align}
        sx={{ bgcolor: '#555', color: '#fff'}}
        style={{ fontSize: '1.1rem'}}
        sortDirection={orderBy === col.id ? order : false}
        key={col.id}>
          <TableSortLabel
            direction={orderBy === col.id ? order : 'asc'}
            active={orderBy === col.id}
            classes={{
              root: classes.th,
              active: classes.active}}
            onClick={createSortHandler(col.id)}>
            {col.label}
            {orderBy === col.id
            ? <Box component='span' sx={visuallyHidden}>
                {order === 'desc'
                  ? 'sorted descending'
                  : 'sorted ascending'}
              </Box>
            : null}
          </TableSortLabel>
      </TableCell>)}
    </TableRow>
  </TableHead>
}

const DetailsGrid = ({ label, value }) => {
  const classes = useStyles()

  return <Grid container className={classes.details} direction='row'>
    <Grid container item xs={6}>{label}</Grid>
    <Grid container item xs={5}>
      {['Avg. Speed', 'Last Race', 'Best Race'].indexOf(label) !== -1
        ? `${value} WPM`
        : value}
    </Grid>
  </Grid>
}

const UserDetails = ({userDetails, isMobileView}) => {
  const {
    name, averageSpeed, lastRace,
    bestRace, races, experienceLevel,
    points, country
  } = userDetails
  const classes = useStyles()

  return <Container
    className={classes.cardContainer}
    sx={{ pt: 2, pb: 2}}
    >
    <Grid container direction='column'>
      <Grid container sx={{ pb: 1 }}
        justifyContent='space-between'
        >
        <Typography component='h5' variant='h5'>
          {name}
        </Typography>
          {isMobileView && <IconButton>
            <CancelRounded />
          </IconButton>}
      </Grid>
      <Card>
        <Grid container direction='row'>
          <Grid container item xs={isMobileView ? 4 : 3}>
            <CardMedia
              component='img'
              src='https://res.cloudinary.com/eubule/image/upload/s--IY55KTaz--/v1632735459/user.jpg'
              alt='Avatar' />
          </Grid>
          <Grid container item xs={isMobileView ? 8 : 9} direction='column'>
            <DetailsGrid
            label='Avg. Speed'
            value={averageSpeed} />
            <DetailsGrid
              label='Last Race'
              value={lastRace} />
            <DetailsGrid
              label='Best Race'
              value={bestRace} />
            <DetailsGrid
              label='Races Completed'
              value={races} />
            <DetailsGrid
              label='Points'
              value={points} />
            <DetailsGrid
              label='Experience Level'
              value={experienceLevel} />
            <DetailsGrid
              label='County'
              value={country} />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Container>
}

export const ScoreTable = ({columns, rows, label}) => {
  const classes = useStyles()
  const isMobileView = useViewport()

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('race');
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePopoverOpen = (name) => (e) => {
    const userDetails = users.find(user => user.name === name)
    setAnchorEl(e.currentTarget)
    setSelectedRow(userDetails)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open  = Boolean(anchorEl)
 
  const condition = (col, val) => col.format && typeof val === 'number'
    ? col.format(val)
    : val

  return <Grid className={classes.scoresTable}>
    <Box boxShadow={4} sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', overflow: 'hidden'}}>
        <TableToolbar
          order={order}
          orderBy={order}
          label={label}
          onRequestSort={handleRequestSort} />
        <TableContainer>
          <Table stickyHeader aria-label='latest scores'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              columns={columns}
              onRequestSort={handleRequestSort} />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map(row => 
                  <TableRow
                    hover
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup='true'
                    className={classes.tableRow}
                    classes={{hover: classes.hover}}
                    onMouseEnter={handlePopoverOpen(row.name.name)}
                    onMouseLeave={handleClose}
                    key={row.race || row.rank}>
                    {columns.map(col => {
                      const value = row[col.id]
                      const Avatar = row[col.id]?.avatar
                      return <TableCell
                        align={col.align}
                        onMouseEnter={col.id !== 'name'
                          ? handleClose
                          : undefined }
                        key={col.id}>
                        {col.id === 'name'
                          ? <div
                              style={{
                                display: 'flex', alignItems: 'center', color: '#2196f3'
                              }}>
                              <Avatar sx={{ color:'#000', marginRight: '0.3em'}} />
                              {value.name}
                            </div>
                          : condition(col, value)
                        }
                      </TableCell>
                    })}
                  <Popover
                    sx={{pointerEvents: 'none'}}
                    open={open}
                    style={{ right: 0}}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    onClose={handleClose}
                    disableRestoreFocus
                    id='mouse-over-popover'>
                    <UserDetails
                      userDetails={selectedRow}
                      isMobileView={isMobileView}
                      />
                  </Popover>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  </Grid>
}

TableToolbar.propTypes = {
  label: PropTypes.string
}
EnhancedTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  )),
}
ScoreTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  )),
  rows: PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.shape({
          $$typeof: PropTypes.symbol,
          type: PropTypes.shape({
            $$typeof: PropTypes.symbol,
            render: PropTypes.func
          })
        })
      })
    ])
  )),
  label: PropTypes.string
}
UserDetails.propTypes = {
  isMobileView: PropTypes.bool,
  userDetails: PropTypes.shape({
    avatar: PropTypes.shape({
      $$typeof: PropTypes.symbol,
      type: PropTypes.shape({
        $$typeof: PropTypes.symbol,
        render: PropTypes.func
      })
    }),
    name: PropTypes.string,
    averageSpeed: PropTypes.number,
    lastRace: PropTypes.number,
    bestRace: PropTypes.number,
    races: PropTypes.number,
    experienceLevel: PropTypes.string,
    points: PropTypes.number,
    country: PropTypes.string
  })
}
DetailsGrid.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}
