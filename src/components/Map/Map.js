import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { VectorMap } from "react-jvectormap";
import axios from "../../utils/request";
import Chart2 from "../../components/Chart/Chart2";

import TextField from "@material-ui/core/TextField";
import "./Map.css";
import moment from "moment";

class MapInfo extends Component {
  state = {
    countryColors: {},
    totals: {},
    chartInfo: [],
    title: "",
    dateChangeHand: {
      startDate: "2020-02-22",
      endDate: moment().format("YYYY-MM-DD"),
    },
    code: false,
  };

  componentWillReceiveProps(nextProps) {
    let colors = {};
    nextProps.tableInfo.forEach((item) => {
      colors[item.CountryCode] = item.TotalConfirmed;
    });
    this.setState({ totals: colors });
  }

  onRegionTipShow(e, el, code) {
    let number = "No data";
    if (this.state.totals[code]) {
      number = this.state.totals[code];
    }
    el.html(el.html() + ": " + number);
  }

  onRegionClick(e, code) {
    if (!code) {
      return;
    }

    let findCountryCode = this.props.tableInfo.find(
      (item) => item.CountryCode === code
    );
    if (!findCountryCode) {
      return;
    }

    axios
      .get(
        `/country/${findCountryCode.Slug}?from=${this.state.dateChangeHand.startDate}T00:00:00Z&to=${this.state.dateChangeHand.endDate}T00:00:00Z`
      )
      .then((response) => {
        let dateChange = response.data.map((item) => {
          item.Date = item.Date.slice(5, 10);
          return item;
        });
        this.setState({
          chartInfo: dateChange,
          title: response.data[0].Country,
          code: code,
        });
      });
  }

  dateChangeHandler(value, prop) {
    let update = { ...this.state.dateChangeHand };
    update[prop] = value;
    if (this.state.code) {
      setTimeout(() => {
        this.onRegionClick(false, this.state.code);
      }, 0);
    }
    this.setState({ dateChangeHand: update });
  }

  render() {
    let colors = {};
    this.props.tableInfo.forEach((item) => {
      colors[item.CountryCode] = item.TotalConfirmed;
    });

    return (
      <Card>
        <CardContent>
          <div style={{ width: "99%", height: 330 }}>
            <VectorMap
              map={"world_mill"}
              backgroundColor="#191A1D"
              ref="map"
              containerStyle={{
                width: "100%",
                height: "100%",
              }}
              series={{
                regions: [
                  {
                    values: colors,
                    scale: ["#C8EEFF", "#0071A4"],
                    normalizeFunction: "polynomial",
                  },
                ],
              }}
              containerClassName="map"
              onRegionTipShow={(e, el, code) =>
                this.onRegionTipShow(e, el, code)
              }
              onRegionClick={(e, code) => this.onRegionClick(e, code)}
            />
          </div>
          <div style={{ display: "inline-flex" }}>
            <form>
              <TextField
                value={this.state.dateChangeHand.startDate}
                onChange={(event) =>
                  this.dateChangeHandler(event.target.value, "startDate")
                }
                id="date"
                label="Date from:"
                type="date"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#E1E5F1",
                  },
                }}
                InputProps={{ style: { color: "#E1E5F1" } }}
              />
            </form>
            <form>
              <TextField
                value={this.state.dateChangeHand.endDate}
                onChange={(event) =>
                  this.dateChangeHandler(event.target.value, "endDate")
                }
                id="date2"
                label="Date to:"
                type="date"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#E1E5F1",
                  },
                }}
                InputProps={{ style: { color: "#E1E5F1" } }}
              />
            </form>
          </div>
          {this.state.chartInfo.length > 0 ? (
            <Chart2 chartInfo={this.state.chartInfo} title={this.state.title} />
          ) : null}
        </CardContent>
      </Card>
    );
  }
}

export default MapInfo;
