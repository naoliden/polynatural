
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Line } from 'react-chartjs-2';
import { lineChartOptions } from '../charts/options';
import { data } from '../charts/falseData';

// TODO guardar los datos del fetch en useMemo para que no se tengan que fetchear cada vez. Tabien
// TODO pueden ser guardados en redux.

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '30vh',
  },
  fixedWidth: {
    width: '100vw',
  }
}))


const Sustainability = (props) => {
  const classes = useStyles()
  const [chartData, setChartData] = useState({})
  const lines = [];

  const load_chart_1 = (data) => {
    setChartData(data)
  }

  // console.log("sustain renders")

  useEffect(() => {
    load_chart_1(data)
    // FIXME maybe rerenders happen here?
    // return( console.log("sustain unrenders") )
  }, [chartData])

  for(var i = 0; i < props.n; i++){
    lines.push(
      <Grid item xs={12} sm={6} key={i}>
        <Typography>Sustentabilidad</Typography>
        <Paper className={classes.paper}>
          <Line data={chartData} options={lineChartOptions}/>
        </Paper>
      </Grid>
    )
  }

  return(
    <React.Fragment>
      {lines}
    </React.Fragment>
  )
}

export default Sustainability;
