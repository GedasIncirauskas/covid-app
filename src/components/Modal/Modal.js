import React, { Component } from "react";
import axios from "../../utils/requestSecond";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Chart from "react-google-charts";
import "./Modal.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class MyModal extends Component {
  state = {
    population: null,
    flag: null,
    capital: null,
    region: null,
    show: false,
  };

  findCountry = () => {
    axios.get(`/${this.props.modalInfo.countryName}`).then((response) => {
      this.setState({
        population: response.data[0].population,
        flag: response.data[0].flag,
        capital: response.data[0].capital,
        region: response.data[0].region,
      });
    });
    let orShow = this.state.show;
    this.setState({ show: !orShow });
  };

  openModalInfo() {
    this.setState({
      population: null,
      flag: null,
      capital: null,
      region: null,
      show: false,
    });
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          onClose={() => this.openModalInfo()}
          open={this.props.isModalOpen}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={this.props.isModalOpen}>
            <div className="Modal">
              <h2>Total {this.props.modalInfo.countryName} statistic</h2>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12} sm={10}>
                  <TableContainer id="transition-modal-title">
                    <Table aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="SizeStyle" align="right">
                            Confirmed
                          </TableCell>
                          <TableCell className="SizeStyle" align="right">
                            Active
                          </TableCell>
                          <TableCell className="SizeStyle" align="right">
                            Deaths
                          </TableCell>
                          <TableCell className="SizeStyle" align="right">
                            Recovered
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={this.props.modalInfo.data.Date}>
                          <TableCell className="SizeStyle" align="right">
                            {this.props.modalInfo.data.Confirmed}
                          </TableCell>
                          <TableCell className="SizeStyle" align="right">
                            {this.props.modalInfo.data.Active}
                          </TableCell>
                          <TableCell className="SizeStyle" align="right">
                            {this.props.modalInfo.data.Deaths}
                          </TableCell>
                          <TableCell className="SizeStyle" align="right">
                            {this.props.modalInfo.data.Recovered}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <br />
                    <Chart
                      chartType="PieChart"
                      data={[
                        ["Today", "Codiv-19"],
                        ["Confirmed", this.props.modalInfo.data.Confirmed],
                        ["Deaths", this.props.modalInfo.data.Deaths],
                        ["Active", this.props.modalInfo.data.Active],
                        ["Recovered", this.props.modalInfo.data.Recovered],
                      ]}
                      options={{
                        backgroundColor: "none",
                        legend: { position: "bottom", alignment: "middle" },
                      }}
                      rootProps={{ "data-testid": "1" }}
                    />
                  </TableContainer>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    className="Button-style"
                    variant="contained"
                    onClick={this.findCountry}
                  >
                    More
                  </Button>
                  <br />
                  {this.state.show ? (
                    <Card>
                      <CardContent className="Box-style">
                        <Typography>
                          <img
                            style={{ width: "30%" }}
                            alt={this.props.modalInfo.countryName}
                            src={this.state.flag}
                          />
                        </Typography>
                        <Typography className="Box-style">
                          Population: <strong>{this.state.population}</strong>
                        </Typography>
                        <Typography className="Box-style">
                          Region: {this.state.region}
                        </Typography>
                        <Typography className="Box-style">
                          Capital: {this.state.capital}
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : null}
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
