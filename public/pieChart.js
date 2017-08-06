var PieChart = function(team){
  var container = document.getElementById('pie-chart');
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container,
      backgroundColor: null
    },
    title: {
      text: "Games Won, Drawn & Lost"
    },
    series: [
    { 
      name: team.teamName + "Games",
      data: [
        {
          name: "Won",
          y: team.wins, 
          color: "blue"
        },
        {
          name: "Drawn",
          y: team.draws,
          color: "yellow"
        },
        {
          name: "Lost",
          y: team.losses,
          color: "red"
        }
        ]
    }]
  });
}
