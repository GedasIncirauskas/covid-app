import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CheckBoxTable extends Component {

  onChangeTable (value) {
    this.props.changeHandler(value)

  }

  render () {
    return (
      <div>
       <FormControlLabel
            control={
            <Checkbox
              checked={this.props.showTable.NewConfirmed}
              onChange={(event) => this.onChangeTable({
                NewConfirmed: event.target.checked
              })} 
              name="gilad" 
              style={{color: "#0AAE84"}}/>}
              style={{color: "#E1E5F1"}}      
              label="Today confirmed"
        />
        <FormControlLabel
            control={
              <Checkbox 
                checked={this.props.showTable.TotalConfirmed}
                onChange={(event) => this.onChangeTable({
                  TotalConfirmed: event.target.checked
                })} 
                name="gilad"  
                style={{color: "#D62754"}}/>}
                style={{color: "#E1E5F1"}} 
                label="Confirmed"
        />
        <FormControlLabel
            control={
              <Checkbox 
                checked={this.props.showTable.TotalDeaths}
                onChange={(event) => this.onChangeTable({
                  TotalDeaths: event.target.checked
                })} 
                name="gilad"  
                style={{color: "orange"}}/>}
                style={{color: "#E1E5F1"}} 
                label="Deaths"
        />
      </div>
    )
  }
};


export default CheckBoxTable;
