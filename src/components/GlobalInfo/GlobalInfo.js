import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './GlobalInfo.css'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class GlobalInfo extends Component {

	state = {
		globalInfo: {
	      NewConfirmed: 0,
	      NewDeaths: 0,
	      NewRecovered: 0,
	      TotalConfirmed: 0,
	      TotalDeaths: 0,
	      TotalRecovered: 0
	    }
	}
	
	render () {
		
		return (
			<Card>
		      <CardContent>
		       	 <Grid container className="styleContainer">
			        <Grid item xs={4}>
			        	 <Card variant="outlined">
					      <CardContent>
					        <Typography color="textSecondary"  variant="overline" display="block" gutterBottom>
					          Total Confirmed
					        </Typography>
					        <Typography style={{color: '#D62754'}}>
					         {this.props.globalInfo.TotalConfirmed}
					        </Typography>
					      </CardContent>
					    </Card>
			        </Grid>
			        <Grid item xs={4}>
			         	<Card variant="outlined">
					      <CardContent>
					        <Typography color="textSecondary"  variant="overline" display="block" gutterBottom>
					          Total Deaths
					        </Typography>
					        <Typography style={{color: '#F0F1EF'}}>
					         {this.props.globalInfo.TotalDeaths}
					        </Typography>
					      </CardContent>
					    </Card>
			        </Grid>
			        <Grid item xs={4}>
			        	<Card variant="outlined">
					      <CardContent>
					        <Typography color="textSecondary"  variant="overline" display="block" gutterBottom>
					          Total Recovered
					        </Typography>
					        <Typography style={{color: '#0AAE84'}}>
					         {this.props.globalInfo.TotalRecovered}
					        </Typography>
					      </CardContent>
					    </Card>
			        </Grid>
			      </Grid>				        	
		      </CardContent>
		    </Card>
		)
	}
};

export default GlobalInfo;