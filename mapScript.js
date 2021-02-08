
// global variable for map.
var gMap = new Array();
var gXLat = -1;
var gXLon = -1;

var gOLat = -1;
var gOLon = -1;

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
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var mapSeed = urlParams.get('s');

    var xLatSeed = urlParams.get('xlat');
    var xLonSeed = urlParams.get('xlon');

    var oLatSeed = urlParams.get('olat');
    var oLonSeed = urlParams.get('olon');

    if (mapSeed != null) {
        console.log(mapSeed);
        var map = new Array();
        for (var i = 0; i < mapSeed.length; i++) {
          map.push(mapSeed.charAt(i));
        }
        gMap = map;
        drawMap(map);
    }
    
    if (xLatSeed != null && xLonSeed != null) {
        drawX (xLatSeed, xLonSeed);
    }

    if (oLatSeed != null && oLonSeed != null) {
        drawO (oLatSeed, oLonSeed);
    }

}

function saveMap() {
  var div = document.getElementById('mapOut');
  div.innerHTML = window.location.hostname + "/map/?s=" + mapToString(gMap) + "&xlat=" + gXLat + "&xlon=" + gXLon + "&olat=" + gOLat + "&olon=" + gOLon;
}

function drawMap(map)  {
  var element = document.getElementById("mapContainer");
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      var sq = document.createElement("div");
      var type = map[(i*10)+j];
      sq.classList.add('tile', "m"+type);
      sq.id = (i*10)+j;

      sq.addEventListener("click", function() {
        calcX(this.id);
      });
      element.appendChild(sq);
    }
  }
}

function calcX(p) {

    var oldX = document.getElementById("x");
    if (oldX != null ){
        gXLat = -1;
        gXLon = -1;
        oldX.remove();
    }
    xlat = Math.floor(p/10) * 80;
    xlon = 80 * (p%10);
    drawX(xlat, xlon);
}

function drawX (lat, lon) {
    var element = document.getElementById("mapContainer");
    var x = document.createElement("div");
    x.classList.add('x');
    x.id = "x";

    x.addEventListener("click", function() {
        calcO(lat, lon);
    });

    gXLat = lat;
    gXLon = lon;
    x.style.left += lon;
    x.style.top += lat;
    element.appendChild(x);
}

function calcO(lat, lon) {

    // remove x
    var oldX = document.getElementById("x");
    if (oldX != null ){
        oldX.remove();
        gXLat = -1;
        gXLon = -1;
    }

    // remove o
    var oldO = document.getElementById("o");
    if (oldO != null ){
        oldO.remove();
        gOLat = -1;
        gOLon = -1;
    }

    drawO(lat, lon);
}

function drawO(lat, lon) {
    var element = document.getElementById("mapContainer");
    var o = document.createElement("div");
    o.classList.add('o');
    o.id = "o";

    o.addEventListener("click", function() {
        var oldX = document.getElementById("o");
        if (oldX != null ){
            oldX.remove();
            gOLat = -1;
            gOLon = -1;
        }
    });

    gOLat = lat;
    gOLon = lon;
    o.style.left += lon;
    o.style.top += lat;
    element.appendChild(o);
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