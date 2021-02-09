
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
    
    if (xLatSeed != null && xLatSeed != -1  && xLonSeed != null && xLonSeed != -1) {
        drawX (xLatSeed, xLonSeed);
    }

    if (oLatSeed != null && oLatSeed != -1  && oLonSeed != null && oLonSeed != -1) {
        drawO (oLatSeed, oLonSeed);
    }

}

function saveMap() {
  var div = document.getElementById('mapOut');
  var str = "https://" + window.location.hostname + "/dnd-tools/map?s=" + mapToString(gMap) + "&xlat=" + gXLat + "&xlon=" + gXLon + "&olat=" + gOLat + "&olon=" + gOLon;

  div.innerHTML = "<a href='"+str+"'>"+str+"</a>";
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

// lets do genetic algorithms! because I am insane and did not get enough sleep last night!
function rateMap(map) {
  var score = 0;
  var cityCount = 0;
  var villageCount = 0;
  var hamletCount = 0;
  var fieldCount = 0;
  var mountainCount = 0;
  var lakeCount = 0;

  for (ri = 0; ri < map.length; ri++) {

    switch(map[ri]) {
      case 6: 
        //hamlet
        hamletCount++;
        break;
      case 5:
        //village
        villageCount++;
        break;
      case 6:
        //hamlet
        hamletCount++;
        break;
      case 3:
        //city
        cityCount++;
        break;
      case 7:
        //mountain
        mountainCount++;
        break;
      case 8:
        //fields
        fieldCount++;
        break;
      case 0:
        //lakes
        lakeCount++;
        break;
      default:
        break;
    }
  }

  // 10 points if there are 3 cities, extra points if there is less. punish if there are more.
  if (cityCount == 0) {
    score -= 10;
  } else if (cityCount < 4 )
  {
    score += 3 - cityCount + 10;
  } else {
    score -= 10;
    score += (cityCount * -1);
  }

  // punish if there are more hamlets than open villages. Cuz villages are more fun.
  if (hamletCount > villageCount) {
    score += villageCount - hamletCount;
  }
  // punish if there are more villages or open fields. To make map less cluttered.
  if (villageCount > fieldCount) {
    score += fieldCount - villageCount;
  }

  
  // punish if there are more mountains or lakes than open fields.
  if (lakeCount > fieldCount) {
    score += fieldCount - lakeCount;
  }
  if (mountainCount > fieldCount) {
    score += fieldCount - mountainCount;
  }

  // extra points if farm lands are next to towns, hamlets or cities. punish if they are in the middle of nowhere.

  // extra points if deep forest is next to forest.

  // extra points the furhter apart cities are.

  return score;
}

function RunGeneticAlgorithm() {
  purgeMap();
  // genesis population size = 128
  var genesisPopulationSize = 2048;
  var population = new Array();
  var offspring = new Array();

  // generate a lot of random maps (a generation)
  for (it = 0; it < genesisPopulationSize; it++) {
    population.push(generateRandomMap());
  }
  

  while (population.length > 1) {
    offspring = RunTournament(population);
    population = offspring;
  }
  drawMap(population[0])
  
}

// takes a generation and returns a offspring generation
function RunTournament(generation) {

    var offspringGeneration = new Array();

    var splitOn = generation.length/2;
    var groupA = generation.slice(0,splitOn);
    var groupB = generation.slice(splitOn);

    var winnerList = new Array();

    // itterate all combatant pairs
    while (groupA.length > 0) {
      var combatantA = groupA.shift();
      var combatantB = groupB.shift();

      var combatantAScore = rateMap(combatantA);
      var combatantBScore = rateMap(combatantB);
      // fight
      if ( combatantAScore > combatantBScore) {
        // combatant A wins
        winnerList.push(combatantA);

      } else if (combatantAScore < combatantBScore) {
        // combatant B wins
        winnerList.push(combatantB);

      } else {
        // draw, flip coin
        if (Math.floor(Math.random() * 2) == 0) {
          // combatant A wins
          winnerList.push(combatantA);

        }else {
          // combatant B wins
          winnerList.push(combatantB);
        }
      }
      
      

    }

    if(winnerList.length == 1) {
      return winnerList;
    }
    // winners make babies
    var splitOn = winnerList.length/2;
    var groupA = winnerList.slice(0,splitOn);
    var groupB = winnerList.slice(splitOn);

    while (groupA.length > 0) {
      var parrentA = groupA.shift();
      var parrentB = groupB.shift();
      // babies goes into next generation
      offspringGeneration.push(spliceGenetics(parrentA, parrentB));
      offspringGeneration.push(spliceGenetics(parrentB, parrentA));
    }

        
    return offspringGeneration;
}


function spliceGenetics(p1, p2) {
  var newOffspring = new Array();
  var splicePoint = p1.length/2;
  var g1 = p1.slice(0,splicePoint);
  var g2 = p2.slice(splicePoint);

  // split the genes
  newOffspring = g1;
  for (si = 0; si < g2.length; si++) {
    newOffspring.push(p2[si]);
  }

  // random mutation

  return newOffspring;
}


function justMakeRandomMap() {
  purgeMap();
  drawMap(generateRandomMap());
}
    