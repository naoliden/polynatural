

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
        display: true,
      }
    }
  }
}


export const fake_data = {
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
}