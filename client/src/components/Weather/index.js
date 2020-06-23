import React from "react";

import {
  Grid,
  Table,
  TableHeaderRow,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
} from "@devexpress/dx-react-grid-bootstrap3";

class Weather extends React.Component {
  render() {
    return (
      <div>
        <div className="grid-fld">
          <Grid rows={this.props.row} columns={this.props.columns}>
            {this.props.error && (
              <p className="weather__error"> {this.props.error} </p>
            )}

            <Table />
            <TableHeaderRow />
            <TableColumnVisibility
              defaultHiddenColumnNames={this.props.defaultHiddenColumnNames}
            />
            <Toolbar />
            <ColumnChooser />
          </Grid>
        </div>
      </div>
    );
  }
}

export default Weather;
