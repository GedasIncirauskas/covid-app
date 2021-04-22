import React, { Component } from "react";
import CheckBoxTable from "../../components/CheckBox/CheckBoxTable";
import "./CountryTable.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Flag from "react-world-flags";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class CountryTable extends Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  state = {
    tableInfo: [],
    showTable: {
      NewConfirmed: true,
      TotalConfirmed: true,
      TotalDeaths: false,
    },
    result: "",
  };

  sort(sortBy) {
    let sortedCountries = this.props.tableInfo.sort(
      (a, b) => b[sortBy] - a[sortBy]
    );
    this.setState({ tableInfo: sortedCountries });
  }

  changeHandler(newState) {
    let rules = 0;
    if (!this.state.showTable.NewConfirmed && !newState.NewConfirmed) {
      rules++;
    }
    if (!this.state.showTable.TotalConfirmed && !newState.TotalConfirmed) {
      rules++;
    }
    if (!this.state.showTable.TotalDeaths && !newState.TotalDeaths) {
      rules++;
    }
    if (rules >= 2) {
      return;
    }

    this.setState(Object.assign(this.state.showTable, newState));
  }

  searchHandler(event) {
    this.setState({ result: event.target.value });
  }

  render() {
    let filterContent = this.props.tableInfo.filter((item) => {
      return (
        item.Country.toLowerCase().indexOf(this.state.result.toLowerCase()) !==
        -1
      );
    });

    return (
      <Card>
        <CardContent>
          <div>
            <TextField
              id="filled-full-width"
              value={this.state.result}
              onChange={this.searchHandler.bind(this)}
              style={{ margin: 6 }}
              placeholder="Search by coutry:"
              fullWidth
              autoFocus
              margin="normal"
              InputProps={{
                style: {
                  color: "#E1E5F1",
                },
              }}
            />
          </div>
          <br />
          <CheckBoxTable
            showTable={this.state.showTable}
            changeHandler={this.changeHandler}
          />
          <TableContainer style={{ height: "100vh", width: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead style={{ textAlign: "center" }}>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell></TableCell>
                  {this.state.showTable.NewConfirmed ? (
                    <TableCell
                      align="right"
                      onClick={() => this.sort("NewConfirmed")}
                    >
                      Today confirmed
                    </TableCell>
                  ) : null}
                  {this.state.showTable.TotalConfirmed ? (
                    <TableCell
                      align="right"
                      onClick={() => this.sort("TotalConfirmed")}
                    >
                      Total confirmed
                    </TableCell>
                  ) : null}
                  {this.state.showTable.TotalDeaths ? (
                    <TableCell
                      align="right"
                      onClick={() => this.sort("TotalDeaths")}
                    >
                      Total deaths
                    </TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterContent.map((item) => (
                  <TableRow key={item.CountryCode}>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() =>
                        this.props.fullInfo(item.Slug, item.Country)
                      }
                    >
                      {item.Country} <FontAwesomeIcon icon={faEye} />
                    </TableCell>
                    <TableCell>
                      <Flag style={{ width: "20px" }} code={item.CountryCode} />
                    </TableCell>
                    {this.state.showTable.NewConfirmed ? (
                      <TableCell align="right">{item.NewConfirmed}</TableCell>
                    ) : null}
                    {this.state.showTable.TotalConfirmed ? (
                      <TableCell align="right">{item.TotalConfirmed}</TableCell>
                    ) : null}
                    {this.state.showTable.TotalDeaths ? (
                      <TableCell align="right">{item.TotalDeaths}</TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  }
}

export default CountryTable;
