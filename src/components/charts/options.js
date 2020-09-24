
export const lineChartOptions = {
  responsive: true,
  title: {text: "Polynatural es bacan", display: true},
  scales: {
    yAxes: {
      ticks: {
        autoSkip: true,
        masSkipLimit: 10,
        beginAtZero: true,
      },
      gridlines: {
        display: false
      },
    },
    xAxes:{
      gridlines: {
        display: false,
      }
    }
  }
}
