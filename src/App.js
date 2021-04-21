import React, { Component } from 'react';
import axios from './utils/request'; 
import CountryTable from './components/CountryTable/CountryTable';
import GlobalInfo from './components/GlobalInfo/GlobalInfo';
import Map from './components/Map/Map';
import Grid from '@material-ui/core/Grid';
import './App.css';

import Modal from './components/Modal/Modal';

class App extends Component {
  constructor () {
    super ()
    this.fullCountryInformation = this.fullCountryInformation.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  state = {
    tableInfo: [],
    globalInfo: {
      NewConfirmed: 0,
      NewDeaths: 0,
      NewRecovered: 0,
      TotalConfirmed: 0,
      TotalDeaths: 0,
      TotalRecovered: 0
    }, 
    isModalOpen: false,
    modalFullInfo: {
        countryName: '',
        data: []
    }
  }

  componentWillMount () {
    axios.get('/summary')
      .then(response => {
        let sortedCountries = response.data.Countries.sort((a,b)=>b.NewConfirmed-a.NewConfirmed)
        this.setState({
          tableInfo: sortedCountries, 
          globalInfo: response.data.Global
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  fullCountryInformation (slug, countryName) {
    axios.get(`/total/country/${slug}`)
      .then(response => {
        this.setState({modalFullInfo: {countryName: countryName, data: response.data[response.data.length - 1]}, isModalOpen: true})
      })
  }

  closeModal () {
    this.setState({isModalOpen: false})
  }

  render () {
    return (
        <Grid container className="MuiPaper-root">
            <Grid item xs={12} sm={3}>
              <div>
                <GlobalInfo globalInfo={this.state.globalInfo}/>
              </div>
              <CountryTable tableInfo={this.state.tableInfo} fullInfo={this.fullCountryInformation}/>
              <Modal modalInfo={this.state.modalFullInfo} isModalOpen={this.state.isModalOpen} closeModal={this.closeModal}/>
            </Grid>
             <Grid item xs={12} sm={9}>
              <Map tableInfo={this.state.tableInfo}/>
            </Grid>
          </Grid>
    );
  }
};

export default App;
