
// global variable for map.
var gMap = new Array();

function generateRandomMap() {
  var map = new Array();

  for (i = 0; i < 100; i++) {
    map.push(Math.floor(Math.random() * 10));
  }
  return map;
}

function bruteForceMap() {
  var loopFlag = false;
  while(loopFlag == false) {
    purgeMap();
    gMap = generateRandomMap();
    loopFlag = validateMap();
  }
  drawMap(gMap);
  
}

function loadMap() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mapSeed = urlParams.get('s')
    console.log(mapSeed);
    var map = new Array();
    for (var i = 0; i < mapSeed.length; i++) {
      map.push(mapSeed.charAt(i));
    } 
    drawMap(map);
}

function saveMap() {
  // + 
  var div = document.getElementById('mapOut');
  div.innerHTML = window.location.hostname + "/map/?s=" + mapToString(gMap);
}

function drawMap(map)  {
  var element = document.getElementById("mapContainer");
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      var sq = document.createElement("div");
      var type = map[(i*10)+j];
      sq.classList.add('tile', "m"+type);
      sq.id = (i*10)+j;
      element.appendChild(sq);
    }
  }
}

function validateMap() {

  var cityCount = 0;
  var villageCount = 0;
  var hamletCount = 0;

  for (i = 0; i < gMap.length; i++) {
    switch(gMap[i]) {
      case 6: 
        //hamlet
        hamletCount++;
        break;
      case 5:
        //village
        villageCount++;
        break;
      case 3:
        //city
        cityCount++;
        break;
      default:
        break;
    }
  }
  
  if (cityCount > 3 || villageCount > 5 || hamletCount > 5) {
    return false;
  }
  return true;
}

function mapToString(map) {
  var out = "";
  for (i = 0; i < map.length; i++) {
    out = out +  map[i];
  }
  return out;
}

function purgeMap() {
  const myNode = document.getElementById("mapContainer");
  myNode.innerHTML = '';
}