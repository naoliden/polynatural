import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Line } from 'react-chartjs-2';


const LineGraph = ({options, data}) => {
  const [chartData, setChartData] = useState({})
  
  const chart = (options) => {
    setChartData({
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      datasets: [
        {
          label: "Title of chart",
          data: [32, 45, 22, 76, 69],
          backgroundColor: [
            'rgba(75, 103, 55, 0.6)'
          ],
          borderWidth: 4,
        }
      ]
    })
  }
  
  useEffect(() => {
    chart()
  }, [])

  return (
    <>
      <Line data={chartData} options={options}/>
    </>
  )

}

export default LineGraph;