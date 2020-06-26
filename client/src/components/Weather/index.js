import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { uniqBy } from 'lodash'


export default class Weather extends React.Component {
    state = {
        rows: [],
        page: 0,
        rowsPerPage: 5

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.rowData.time !== this.props.rowData.time && this.props.rowData.winddir){
            const uniqRowData = uniqBy([...prevState.rows, this.props.rowData], 'time')
            this.setState({rows: uniqRowData})
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage})
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value ,page: 0})
    }

    render(){
        const {rows, page, rowsPerPage} = this.state
  return (
      <div className='weather-table'>
    <TableContainer component={Paper}>
      <Table stickyHeader size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Wind Direction</TableCell>
            <TableCell>Wind Speed</TableCell>
            <TableCell>Wind Gust</TableCell>
            <TableCell>Wind Gust Direction</TableCell>
            <TableCell>Wind Speed Average 2m</TableCell>
            <TableCell>Wind Direction Average 2m</TableCell>
            <TableCell>Wind Gust Average 10m</TableCell>
            <TableCell>Wind Gust Direction 10m</TableCell>
            <TableCell>Rain intensity</TableCell>
            <TableCell>Daily raining intensity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>  (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.winddir}</TableCell>
              <TableCell align="right">{row.windspeedmph}</TableCell>
              <TableCell align="right">{row.windgustmph}</TableCell>
              <TableCell align="right">{row.windgustdir}</TableCell>
              <TableCell align="right">{row.windspdmph_avg2m}</TableCell>
              <TableCell align="right">{row.winddir_avg2m}</TableCell>
              <TableCell align="right">{row.windgustmph_10m}</TableCell>
              <TableCell align="right">{row.windgustdir_10m}</TableCell>
              <TableCell align="right">{row.rainin}</TableCell>
              <TableCell align="right">{row.dailyrainin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        component={Paper}
        rowsPerPageOptions={[5,10,15]}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
          </div>
  )
}
}

