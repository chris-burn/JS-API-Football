var comparisonChart = function(container, standings){
  var container = document.getElementById('comparison-chart');
  
  var teamNames = [];
  var goalsForArr = [];
  var goalsAgainstArr = [];

  for(var team of standings){
    var teamName = team.teamName;
    var goalsFor = team.goals;
    var goalsAgainst = team.goalsAgainst;

    teamNames.push(teamName);
    goalsForArr.push(goalsFor);
    goalsAgainstArr.push(goalsAgainst);
  }

  var chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container,
      backgroundColor: null
    },
    title: {
      text: "Goals Comparison"
    },
    // plotOptions: {column:{colorByPoint: true}},
    colors: ["lightgreen", "red"],
    series: [{
      name: "Goals For",
      data: goalsForArr
    },
    {
      name: "Goals Against",
      data: goalsAgainstArr
    }
    ],
    xAxis: {
      categories: teamNames
    },
    yAxis: {
      title: {text: "Number of Goals"}
    }
  });


}