import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class CheckBox extends Component {
  onChange(value) {
    this.props.changeHandler(value);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.show.Recovered}
              onChange={(event) =>
                this.onChange({
                  Recovered: event.target.checked,
                })
              }
              name="gilad"
              style={{ color: "#0AAE84" }}
            />
          }
          style={{ color: "#E1E5F1" }}
          label="RECOVERED"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.show.Deaths}
              onChange={(event) =>
                this.onChange({
                  Deaths: event.target.checked,
                })
              }
              name="gilad"
              style={{ color: "#F0F1EF" }}
            />
          }
          style={{ color: "#E1E5F1" }}
          label="DEATHS"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.show.Confirmed}
              onChange={(event) =>
                this.onChange({
                  Confirmed: event.target.checked,
                })
              }
              name="gilad"
              style={{ color: "#D62754" }}
            />
          }
          style={{ color: "#E1E5F1" }}
          label="CONFIRMED"
        />
      </div>
    );
  }
}

export default CheckBox;
