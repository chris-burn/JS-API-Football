var app = function(){
  var url = "http://api.football-data.org/v1/competitions/426";
  var url1 = "http://api.football-data.org/v1/competitions/426/teams";
  var url2 = "http://api.football-data.org/v1/competitions/426/leagueTable";

  makeRequest(url, requestComplete);
  makeRequest(url1, requestComplete1);
  makeRequest(url2, requestComplete2);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.setRequestHeader('X-Auth-Token', '4a74faa420664f438056a6dcee3b8c67')
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var season = JSON.parse(jsonString);
};

var requestComplete1 = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var teamObject = JSON.parse(jsonString);
  // console.log(teamObject);
  populateGrid(teamObject.teams);
};

var requestComplete2 = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var leagueObject = JSON.parse(jsonString);
  // console.log(leagueObject);
  populateTable(leagueObject.standing);
  populateDropDown(leagueObject.standing);
  displayComparisonChart(leagueObject.standing);
};

var populateGrid = function(teams){
  var div = document.getElementById('team-grid');

  teams.forEach(function(team){
  
    var cell = document.createElement('div');
    div.appendChild(cell);

    var image = document.createElement('img');
    image.src = team.crestUrl;
    image.style = "height: 90px; width: 90px;";
    image.className = "img-responsive";
    cell.appendChild(image);
  });
};


var populateTable = function(standings){
  var table = document.getElementById('league-table');
  var topRow = document.createElement('tr');
  table.appendChild(topRow);
  var top1 = document.createElement('td');
  topRow.appendChild(top1);
  var top2 = document.createElement('td');
  topRow.appendChild(top2);
  var top3 = document.createElement('td');
  top3.innerText = "Team"
  topRow.appendChild(top3);
  var top4 = document.createElement('td');
  top4.innerText = "Pts"
  topRow.appendChild(top4);

    standings.forEach(function(standing){
      var row = document.createElement('tr');
      table.appendChild(row);

      var td1 = document.createElement('td');
      td1.innerText = standing.position;
      row.appendChild(td1);

      var td2 = document.createElement('td');
      row.appendChild(td2);   

      var td2Img = document.createElement('img');
      td2Img.src = standing.crestURI;
      td2Img.style = "height: 35px; width: 35px;";   
      td2.appendChild(td2Img);
    
      var td3 = document.createElement('td');
      td3.innerText = standing.teamName;
      row.appendChild(td3);

      var td4 = document.createElement('td');
      td4.innerText = standing.points;
      row.appendChild(td4);
    });
};


var populateDropDown = function(teams){
  var select = document.getElementById('team-dropdown');

  teams.forEach(function(team, index){
    var option = document.createElement('option');
    option.innerText = team.teamName;
    option.value = index;
    select.appendChild(option);
  });

  select.addEventListener('change', function(){
    var index = this.value;
    var teamToDisplay = teams[index];
    // console.log(teamToDisplay);
    displayData(teamToDisplay);
    displayPie(teamToDisplay);
    displayBar(teamToDisplay);
  });
}

var displayData = function(team){
    var ul = document.getElementById('data-list');
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li');
    var li4 = document.createElement('li');
    var li5 = document.createElement('li');
    var li6 = document.createElement('li');
    // li1.innerText = team.teamName;
    li2.innerText = "Wins: " + team.wins;
    li3.innerText = "Draws: " + team.draws;
    li4.innerText = "Losses: " + team.losses;
    li5.innerText = "Goals For: " + team.goals;
    li6.innerText = "Goals Against: " + team.goalsAgainst;
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
};

var displayPie = function(team){
  PieChart(team);
};

var displayBar = function(team){
  BarChartTeam(team);
};

var displayComparisonChart = function(positions){
    var container = document.getElementById('comparison-chart');
    comparisonChart(container, positions);
};
  
window.addEventListener('load', app);