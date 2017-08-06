var BarChartTeam = function(team){
  var container = document.getElementById('bar-chart');
  var chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container,
      backgroundColor: null
    },
    title: {
      text: "Goals For & Against"
    },
    plotOptions: {column:{colorByPoint: true}},
    colors: ["green", "orangered"],
    series: [{
      name: "Goals",
      data: [team.goals,team.goalsAgainst]
    }],
    xAxis: {
      categories: ['For', 'Against']
    },
    yAxis: {
      title: {text: "Number of Goals"}
    }
  })

}