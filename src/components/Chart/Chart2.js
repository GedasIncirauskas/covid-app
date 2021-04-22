import React, { Component } from "react";
import Chart from "react-google-charts";
import CheckBox from "../../components/CheckBox/CheckBox";

class Chart2 extends Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }
  state = {
    Date: "Date",
    Confirmed: "Confirmed",
    Deaths: "Deaths",
    Recovered: "Recovered",
    show: {
      Confirmed: true,
      Deaths: true,
      Recovered: true,
    },
  };

  changeHandler(newState) {
    let count = 0;
    if (!this.state.show.Confirmed && !newState.Confirmed) {
      count++;
    }
    if (!this.state.show.Deaths && !newState.Deaths) {
      count++;
    }
    if (!this.state.show.Recovered && !newState.Recovered) {
      count++;
    }
    if (count >= 2) {
      return;
    }

    this.setState(Object.assign(this.state.show, newState));
  }

  render() {
    let data = this.props.chartInfo.map((item) => {
      let info = [item.Date];
      if (this.state.show.Recovered) {
        info.push(item.Recovered);
      }
      if (this.state.show.Deaths) {
        info.push(item.Deaths);
      }
      if (this.state.show.Confirmed) {
        info.push(item.Confirmed);
      }
      return info;
    });

    let labels = ["x"];
    let colors = [];
    if (this.state.show.Recovered) {
      labels.push("RECOVERED");
      colors.push("#0AAE84");
    }
    if (this.state.show.Deaths) {
      labels.push("DEATHS");
      colors.push("#F0F1EF");
    }
    if (this.state.show.Confirmed) {
      labels.push("CONFIRMED");
      colors.push("#D62754");
    }

    return (
      <div>
        <Chart
          height={"400px"}
          chartType="LineChart"
          loader={
            <div
              style={{
                color: "#E1E5F1",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Loading {this.props.title} statistic
            </div>
          }
          data={[labels, ...data]}
          options={{
            legend: "none",
            animation: {
              duration: 1000,
              easing: "out",
            },
            colors: colors,
            hAxis: { textStyle: { color: "#E1E5F1" } },
            vAxis: { textStyle: { color: "#E1E5F1" } },
            backgroundColor: "#191A1D",
            title: this.props.title + " Covid-19 statistic",
            titleTextStyle: {
              color: "#E1E5F1",
              fontSize: 15,
            },
            series: {
              1: { curveType: "function" },
            },
          }}
          rootProps={{ "data-testid": "3" }}
        />
        <CheckBox show={this.state.show} changeHandler={this.changeHandler} />
      </div>
    );
  }
}

export default Chart2;
