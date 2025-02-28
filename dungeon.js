
// Declaration
class Room {
    constructor(directions, tableIndex) {
        // a string containing the cardinal direction that the room connects to.
        this.directions = directions;
        // the number representing the room description
        this.tableIndex = tableIndex;
    }
  }

// TODO implement this very important feature!
// without it dungeons can become just a long corridor without doors ending in a dead end...
var doorsLeftUnopened = 0

var facing = "N"

var playerLocation = null;

var dungeon = [
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "
];


function exploreDungeon(index){

    // have we been here before?!?
    if(dungeon[index] != " ") {
        console.log("WE HAVE BEEN HERE BEFORE!")
        // aw shiet.. time to do some heavy calculations...

        // TODO no need to generate new room... but we need to spin!
        // rotate facing unitl it matches the paths available in the room.
        // then just print the room again, and pretend like nothing happened.
        return
    }


    output = "";
    blockedPaths = "";
    connectedPaths = "";

    // TODO calcualte subset of numbers that needs to be rolled on
    // if for example there is a different toom that needs to connect to this room from elsewhere.
    //limitedNumbers = calculateLimitedNumbers(index);

    blockedNumbers = calculateBlockedNumbers(index);
    console.log("blocked numbers: " + blockedNumbers);


    // ROLL ON RANDOM INSTRUCTION TABLE A
    var d4 = Math.ceil(Math.random() * 4);

    var d100 = rollRoom(blockedNumbers);

    var dir = getConnectingPaths(d100) 

    console.log ("possible paths: " + dir)

    //var newRoom = new Room(facing, d100);
    //dungeon[index] = newRoom;
    setRoom(index, d100);

    var roomDescription = getDescription(d100);
    console.log(roomDescription);
    output += roomDescription;


    if (d4 == 1) {
        console.log("RANDOM FLAIR")
        console.log(getRandomFlair());
    }

    if (d4 == 4) {
        console.log("RANDOM ENCOUNTER")
        console.log(getRandomEncounter());
    }

    printDungeon(output)

}



function rollRoom(blockedNumbers) {
    let randomNumber;
    do {
      randomNumber = Math.ceil(Math.random() * 100);
    } while (blockedNumbers.includes(randomNumber));
    return randomNumber;
  }


function startDungeonCrawl() {
    playerLocation = setRandomStartingLocation();
    exploreDungeon(playerLocation);
}


function setRandomStartingLocation() {
    // can spawn at any point in the dungeon... for now.
    return Math.floor(Math.random() * 100);
}



function exploreAhead() {
    // no need for checking where you can go. that has already been done!
    if(facing == "N" && dungeon[playerLocation].directions.includes("N")) {
        playerLocation -= 10;
    } else if (facing == "E" && dungeon[playerLocation].directions.includes("E")) {
        playerLocation++;
    } else if (facing == "S" && dungeon[playerLocation].directions.includes("S")) {
        playerLocation += 10;
    } else if (facing == "W" && dungeon[playerLocation].directions.includes("W")) {
        playerLocation--;
    } else {
        console.log("cannot go straight ahead!")
        return
    }
    exploreDungeon(playerLocation);
}

function exploreRight() {
    // no need for checking where you can go. that has already been done!
    if(facing == "N" && dungeon[playerLocation].directions.includes("E")) {
        facing = "E"
        playerLocation++;
    } else if (facing == "E" && dungeon[playerLocation].directions.includes("S")) {
        facing = "S"
        playerLocation += 10;
    } else if (facing == "S" && dungeon[playerLocation].directions.includes("W")) {
        facing = "W"
        playerLocation--;
    } else if (facing == "W" && dungeon[playerLocation].directions.includes("N")) {
        facing = "N"
        playerLocation -= 10;
    } else {
        console.log("cannot go right!")
        return
    }
    exploreDungeon(playerLocation);
}

function goBack() {
    // this is a weird one... not sure how this will work in the future...
    // TODO is this broken now?
    if(facing == "N" && dungeon[playerLocation].directions.includes("S")) {
        facing = "S"
        playerLocation += 10;
    } else if (facing == "E" && dungeon[playerLocation].directions.includes("W")) {
        facing = "W"
        playerLocation--;
    } else if (facing == "S" && dungeon[playerLocation].directions.includes("N")) {
        facing = "N"
        playerLocation -= 10;
    } else if (facing == "W" && dungeon[playerLocation].directions.includes("E")) {
        facing = "E"
        playerLocation++;
    } else {
        console.log("cannot go back!")
        return
    }
    exploreDungeon(playerLocation);
}

function exploreLeft() {
    // no need for checking where you can go. that has already been done!
    if(facing == "N" && dungeon[playerLocation].directions.includes("W")) {
        facing = "W"
        playerLocation--;
    } else if (facing == "E" && dungeon[playerLocation].directions.includes("N")) {
        facing = "N"
        playerLocation -= 10;
    } else if (facing == "S" && dungeon[playerLocation].directions.includes("E")) {
        facing = "E"
        playerLocation++;
    } else if (facing == "W" && dungeon[playerLocation].directions.includes("S")) {
        facing = "S"
        playerLocation += 10;
    } else {
        console.log("cannot go left!")
        return
    }
    exploreDungeon(playerLocation);
}



// takes a die roll for the Random dungeon table and generates a room 
// based on facing direction and places it in the dungeon on set index.
function setRoom(index, dieRoll) {

    // create a room
    roomPaths = getConnectingPaths(dieRoll)

    room = new Room(roomPaths, dieRoll) 

    // stick it in the dungeon
    dungeon[index] = room;
}



// takes the index of an unexplored room and based in the facing variable returns
// directions (ARBL) that cannot be explored from that tile
function getBlockedPaths(index) {
    var blockedCardinalPaths = "";


    // check if edge of map
    var roomNorthIndex = index-10;
    if (roomNorthIndex < 0) {
        blockedCardinalPaths += "N"
    }

    var roomSouthIndex = index+10;
    if (roomSouthIndex > 99) {
        blockedCardinalPaths += "S"
    }

    var roomEastIndex = index+1;
    if (roomEastIndex == 10 || roomEastIndex == 20 || roomEastIndex == 30|| roomEastIndex == 40|| roomEastIndex == 50|| roomEastIndex == 60|| roomEastIndex == 70|| roomEastIndex == 80|| roomEastIndex == 80|| roomEastIndex == 90 || roomEastIndex == 100 ) {
        blockedCardinalPaths += "E"
    }

    var roomWestIndex = index-1;
    if (roomWestIndex == -1 || roomWestIndex == 9 || roomWestIndex == 19|| roomWestIndex == 29|| roomWestIndex == 39|| roomWestIndex == 49|| roomWestIndex == 59|| roomWestIndex == 69|| roomWestIndex == 79|| roomWestIndex == 89 ) {
        blockedCardinalPaths += "W"
    }


    // check the neighbouring room is explored BUT does not lead back to this room. 
    if (!blockedCardinalPaths.includes("N") && (dungeon[roomNorthIndex] != null) && (dungeon[roomNorthIndex] != " ") )  {
        if(!dungeon[roomNorthIndex].directions.includes("S")) {
            console.log("room north of here is explored but has no door leading south!")
            blockedCardinalPaths += "N";
        }
    }
    if (!blockedCardinalPaths.includes("E") && (dungeon[roomEastIndex] != null) && (dungeon[roomEastIndex] != " ") )  {
        console.log("pipe" + dungeon[roomEastIndex])
        if(!dungeon[roomEastIndex].directions.includes("W")) {
            console.log("room east of here is explored but has no door leading west!")
            blockedCardinalPaths += "E";
        }
    }
    if (!blockedCardinalPaths.includes("S") && (dungeon[roomSouthIndex] != null) && (dungeon[roomSouthIndex] != " ") )  {
        if(!dungeon[roomSouthIndex].directions.includes("N")) {
            console.log("room south of here is explored but has no door leading north!")
            blockedCardinalPaths += "S";
        }
    }
    if (!blockedCardinalPaths.includes("W") && (dungeon[roomWestIndex] != null) && (dungeon[roomWestIndex] != " ") )  {
        if(!dungeon[roomWestIndex].directions.includes("E")) {
            console.log("room west of here is explored but has no door leading east!")
            blockedCardinalPaths += "W";
        }
    }

    console.log("cannot go " + blockedCardinalPaths);


    // now translate cardinal paths to directional paths.
    var blockedRelativePaths = "";

    if (facing == "N") {
        if(blockedCardinalPaths.includes("N")) {
            blockedRelativePaths+="A";
        }
        if(blockedCardinalPaths.includes("E")) {
            blockedRelativePaths+="R";
        }
        if(blockedCardinalPaths.includes("S")) {
            blockedRelativePaths+="B";
        }
        if(blockedCardinalPaths.includes("W")) {
            blockedRelativePaths+="L";
        }
    } else if (facing == "E") {
        if(blockedCardinalPaths.includes("N")) {
            blockedRelativePaths+="L";
        }
        if(blockedCardinalPaths.includes("E")) {
            blockedRelativePaths+="A";
        }
        if(blockedCardinalPaths.includes("S")) {
            blockedRelativePaths+="R";
        }
        if(blockedCardinalPaths.includes("W")) {
            blockedRelativePaths+="B";
        }
    } else if (facing == "S") {
        if(blockedCardinalPaths.includes("N")) {
            blockedRelativePaths+="B";
        }
        if(blockedCardinalPaths.includes("E")) {
            blockedRelativePaths+="L";
        }
        if(blockedCardinalPaths.includes("S")) {
            blockedRelativePaths+="A";
        }
        if(blockedCardinalPaths.includes("W")) {
            blockedRelativePaths+="R";
        }
    } else if (facing == "W") {
        if(blockedCardinalPaths.includes("N")) {
            blockedRelativePaths+="R";
        }
        if(blockedCardinalPaths.includes("E")) {
            blockedRelativePaths+="B";
        }
        if(blockedCardinalPaths.includes("S")) {
            blockedRelativePaths+="L";
        }
        if(blockedCardinalPaths.includes("W")) {
            blockedRelativePaths+="A";
        }
    }

    console.log("cannot go " + blockedRelativePaths);

    return blockedRelativePaths;


}






// returns a sting containing the directions that this room is connected to (NESW)
// need to know this if you are generating a new room.
function getConnectedPathsForUnexploredRoom(index) {

    var connectedDirections = "";

    var roomNorthIndex = index-10;
    if (roomNorthIndex < 0) {
        roomNorthIndex = null
    }

    var roomSouthIndex = index+10;
    if (roomSouthIndex > 99) {
        roomSouthIndex = null
    }

    var roomEastIndex = index+1;
    if (roomEastIndex == 10 || roomEastIndex == 20 || roomEastIndex == 30|| roomEastIndex == 40|| roomEastIndex == 50|| roomEastIndex == 60|| roomEastIndex == 70|| roomEastIndex == 80|| roomEastIndex == 80|| roomEastIndex == 90 || roomEastIndex == 100 ) {
        roomEastIndex = null
    }

    var roomWestIndex = index-1;
    if (roomWestIndex == -1 || roomWestIndex == 9 || roomWestIndex == 19|| roomWestIndex == 29|| roomWestIndex == 39|| roomWestIndex == 49|| roomWestIndex == 59|| roomWestIndex == 69|| roomWestIndex == 79|| roomWestIndex == 89 ) {
        roomWestIndex = null
    }

    console.log("room to the north is index " + roomNorthIndex)
    console.log("room to the east is index " + roomEastIndex)
    console.log("room to the south is index " + roomSouthIndex)
    console.log("room to the west is index " + roomWestIndex)


    if (roomNorthIndex != null) {
        var roomNorth = dungeon[roomNorthIndex];
        if (roomNorth == " ") {
            console.log("Room north is unexplored.")
        } else {
            console.log("Room north is explored.")
            if (dungeon[roomNorthIndex].directions.includes("S")){
                console.log("room north leads here!")
                connectedDirections += "N"
            }
        }
    }

    if (roomEastIndex != null) {
        var roomEast = dungeon[roomEastIndex];
        if (roomEast == " ") {
            console.log("Room east is unexplored.")
        } else {
            console.log("Room east is explored.")
            if (dungeon[roomEastIndex].directions.includes("W")){
                console.log("room east leads here!")
                connectedDirections += "E"
            }
        }
    }

    if (roomSouthIndex != null) {
        var roomSouth = dungeon[roomSouthIndex];
        if (roomSouth == " ") {
            console.log("Room south is unexplored.")
        } else {
            console.log("Room south is explored.")
            if (dungeon[roomSouthIndex].directions.includes("N")){
                console.log("room south leads here!")
                connectedDirections += "S"
            }
        }
    }

    if (roomWestIndex != null) {
        var roomWest = dungeon[roomWestIndex];
        if (roomWest == " ") {
            console.log("Room west is unexplored.")
        } else {
            console.log("Room west is explored.")
            if (dungeon[roomWestIndex].directions.includes("E")){
                console.log("room west leads here!")
                connectedDirections += "W"
            }
        }
    }
    

}

// returns an array of all the entries in the random dungeon table that cannot
// be used based on the blocked relative paths (ARBL)
function calculateBlockedNumbers(index) {

    blockedPaths = getBlockedPaths(index);
    var blockedArray = [];


    // if this is the firs room to be explored (the dungeon is empty) then block dead ends from being generated.
    if (!dungeon.some(value => value !== " ")) {
        for (let i = 1; i <= 30; i++) {
            blockedArray.push(i);
        }
    }

    // cant go ahead
    if (blockedPaths.includes("A")) {
        // block 41-50, 61-80, 91-100
        for (let i = 41; i <= 50; i++) {
            blockedArray.push(i);
        }
        for (let i = 61; i <= 80; i++) {
            blockedArray.push(i);
        }
        for (let i = 91; i <= 100; i++) {
            blockedArray.push(i);
        }
    }

    // cant go right
    if (blockedPaths.includes("R")) {
        // block 51-60, 71-100
        for (let i = 51; i <= 60; i++) {
            blockedArray.push(i);
        }
        for (let i = 71; i <= 100; i++) {
            blockedArray.push(i);
        }
    }

    // cant go back
    // wait... you can always go back...

    // cant go left
    if (blockedPaths.includes("R")) {
        // block 31-40, 61-70, 81-100
        for (let i = 31; i <= 40; i++) {
            blockedArray.push(i);
        }
        for (let i = 61; i <= 70; i++) {
            blockedArray.push(i);
        }
        for (let i = 81; i <= 100; i++) {
            blockedArray.push(i);
        }
    }

    return blockedArray;

}


function printDungeon(output) {
    for (let i = 0; i < 10; i ++) {
        var dungeonRow = ""
        for (let j = 0; j < 10; j ++) {

            if (dungeon[(i*10)+j] == " ") {
                dungeonRow += "⯀"
            } else {
                if (playerLocation == (i*10)+j) {
                    dungeonRow += "🧙‍♂️"
                } else {
                    dungeonRow += "[]"
                }
                
            }
        }
        console.log(i +":"+ dungeonRow)

    }

    console.log("facing: " + facing);

    console.log("playerLocation: " + playerLocation)

    console.log("-----------------------------------");
    document.getElementById("text-area").value = output;


    // disable all buttons by default and only enable them if walking is allowed.
    document.getElementById("btnUp").disabled = true;
    document.getElementById("btnBack").disabled = true;
    document.getElementById("btnLeft").disabled = true;
    document.getElementById("btnRight").disabled = true;

    // disable the buttons of the direction that cannot be explored.
    if (facing == "N"){
        if (dungeon[playerLocation].directions.includes("N")) {
            document.getElementById("btnUp").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("E")) {
            document.getElementById("btnRight").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("S")) {
            document.getElementById("btnBack").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("W")) {
            document.getElementById("btnLeft").disabled = false;
        }
    } if (facing == "E") {
        if (dungeon[playerLocation].directions.includes("N")) {
            document.getElementById("btnLeft").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("E")) {
            document.getElementById("btnUp").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("S")) {
            document.getElementById("btnRight").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("W")) {
            document.getElementById("btnBack").disabled = false;
        }
    } if (facing == "S") {
        if (dungeon[playerLocation].directions.includes("N")) {
            document.getElementById("btnBack").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("E")) {
            document.getElementById("btnLeft").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("S")) {
            document.getElementById("btnUp").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("W")) {
            document.getElementById("btnRight").disabled = false;
        }
    } if (facing == "W") {
        if (dungeon[playerLocation].directions.includes("N")) {
            document.getElementById("btnRight").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("E")) {
            document.getElementById("btnBack").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("S")) {
            document.getElementById("btnLeft").disabled = false;
        }
        if (dungeon[playerLocation].directions.includes("W")) {
            document.getElementById("btnUp").disabled = false;
        }
    }
    

}

// takes the number corresponding to the Random dungeon table 
// and calculates the connecting paths ARBL (ahead, right, back, left).
function getConnectingPaths(number) {

    // the connecting paths ARBL (ahead, right, back, left).
    paths = "";

    // all rooms connect back... even dead ends EXCEPT THE FIRST ROOM!!!!
    if (dungeon.some(value => value !== " ")) {
        paths += "B";
    }
    

    // continues left (31-40, 61-70, 81-100)
    if ((number > 30 && number < 41) || (number > 60 && number < 71) || (number > 80) ) {
        console.log("continues left")
        paths += "L";
    }

    // continues ahead 
    if ((number > 40 && number < 51) || (number > 60 && number < 81) || (number > 90)) {
        console.log("continues ahead")
        paths += "A";
    }

    // continues right 
    if ((number > 50 && number < 61) || (number > 70)) {
        console.log("continues right")
        paths += "R";
    }



    // now translate paths to cardinal directions
    var cardinalPaths = "";

    if (facing == "N") {
        if(paths.includes("A")) {
            cardinalPaths+="N";
        }
        if(paths.includes("R")) {
            cardinalPaths+="E";
        }
        if(paths.includes("B")) {
            cardinalPaths+="S";
        }
        if(paths.includes("L")) {
            cardinalPaths+="W";
        }
    } else if (facing == "E") {
        if(paths.includes("A")) {
            cardinalPaths+="E";
        }
        if(paths.includes("R")) {
            cardinalPaths+="R";
        }
        if(paths.includes("B")) {
            cardinalPaths+="W";
        }
        if(paths.includes("L")) {
            cardinalPaths+="N";
        }
    } else if (facing == "S") {
        if(paths.includes("A")) {
            cardinalPaths+="S";
        }
        if(paths.includes("R")) {
            cardinalPaths+="W";
        }
        if(paths.includes("B")) {
            cardinalPaths+="N";
        }
        if(paths.includes("L")) {
            cardinalPaths+="E";
        }
    } else if (facing == "W") {
        if(paths.includes("A")) {
            cardinalPaths+="W";
        }
        if(paths.includes("R")) {
            cardinalPaths+="N";
        }
        if(paths.includes("B")) {
            cardinalPaths+="E";
        }
        if(paths.includes("L")) {
            cardinalPaths+="S";
        }
    }

    return cardinalPaths;

}



function getDescription(number) {
    const descriptions = {
        // Dead end (neutral)
        1: "A dark corridor ends abruptly in a pile of rubble. The corridor is caved in and whatever was beyond it is now lost and buried under countless tons of rubble.",
        2: "What was once a large room is now just a pile of stone. The ceiling has caved in and the content of this room is now lost to time.",
        3: "This seems to have once been some sort of storage room. All that remain now are piles of rotten rubble that has been gnawed by countless rats.",
        4: "You enter what seems to have been an armory long ago. But a quick scan of the room reveals that there is nothing of value here. The few weapons and armors that you find have rusted beyond repair, and if there ever was anything in here of value, it has been taken long ago.",
        5: "There are no furniture in this room, only cold stone walls.",
        6: "This room seems to have once been the living quarters for the people who lived here long ago. Bed frames ruined by time line the walls and chests and crates lay scattered here and there. Their locks violently broken and their contents stolen long ago.",
        7: "This small room seems to have been a storage space or closet. There is not much here except old rubble.",
        8: "What this room was originally designed for is lost to time, but most recently it seems to have been used as a prison cell. Shackles have been attached to the wall and all other content of the room has been removed.",
        9: "Rusty cages line the walls of this room that apparently once housed prisoners… or maybe beasts? Now all that remains is dust and decay. All cages are unlocked and the keys are nowhere to be found.",
        10: "The corridor in front of you only abruptly ends in a small niche. A small shelf on the wall probably once held some sort of effigy, but now it is empty.",
        // Dead end (good)
        11: "A battle took place here recently. Bodies lay scattered around the room, and judging from the smell they died just a few days ago.\n\n[ROLL ON RANDOM ENCOUNTERS TABLE] fought against [ROLL ON RANDOM ENCOUNTERS TABLE], and it looks like there were no survivors. If they choose to loot the bodies they will find:\n[ROLL ON RANDOM MUNDANE LOOT TABLE 6 TIMES],\n[ROLL ON THE RANDOM TREASURE TABLE ONCE]",
        12: "This corridor seems to have caved in not too long ago. As you inspect the rubble to determine if it would be possible to get to the other side, you see something shimmer underneath the stones. \nA cold, dead hand sticks out from underneath a large boulder. It would seem that an adventurer met their untimely end here not long ago. In their hand, you find a sword with a golden hilt. Its worth is 1d4 x100 gold pieces. (It is not magical… unless you want it to be...)",
        // TODO fix this... in the book too...
        13: "[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nWhen all party members solve the puzzle, a secret compartment opens in the wall opposite the door. Inside, they will find a small chest.\n[ROLL ON THE RANDOM TREASURE TABLE ONCE]",
        14: "As you open the door to this room, its weight strikes you by surprise—the backside of this door is heavily reinforced with thick steel, and the walls are thick. This seems to have been some sort of vault or treasury, but its contents have been looted long ago.\n\nHowever, careful investigation of the wall finds a hidden mechanism that opens a door to a secret compartment where a chest remains, containing 1d4x100 gold + [ROLL ON THE RANDOM TREASURE TABLE ONCE].\n\nIf the party came here looking for a specific treasure: make it clear to them that this room is NOT their target, and that the real treasure probably still lies somewhere within the dungeon.",
        15: "You enter a small and unremarkable room; it is well protected and would make for a good place to rest a while. On closer inspection, you find a loose stone in the floor hiding a secret!\n[ROLL ON RANDOM MUNDANE LOOT TABLE 2 TIMES]",
        16: "Stacks of old crates line the walls of this room. Most hold spoiled food, but you think that a thorough investigation may find more interesting things. \n[ROLL ON RANDOM MUNDANE LOOT TABLE UP TO * NUMBER OF PLAYERS] to determine what they find, depending on how many characters search.",
        17: "A trap has been sprung in this corridor. Long spikes shot out of the wall, killing a poor goblin who stepped on a pressure plate.\n\nIf the party searches the corpse: 1d10 x 10 gold + [ROLL ON RANDOM MUNDANE LOOT TABLE ONCE]",
        18: "Frescoes line the walls of this dark corridor; they seem to depict an ancient battle between the forces of order and chaos.\n\nIf the party decides to study the walls more closely and roll high, they may find a button hidden in the eye of one of the characters depicted. If pressed, a secret compartment will open, and inside they will find 1d100 x 10 gold.",
        19: "As you enter this corridor, you come across two goblins fighting over a weathered backpack. Before the party can approach them, they both deliver a killing blow to each other and fall to the floor.\n\nThey themselves have nothing of value besides the clubs they used to kill each other, but the backpack seems promising!\n[ROLL ON RANDOM MUNDANE LOOT TABLE 2 TIMES],\n[ROLL ON THE RANDOM TREASURE TABLE ONCE]",
        20: "You enter a small shrine, where a stone statue of a benevolent goddess stands in a small pool of faintly glowing water. \n\nIf a party member enters the pool, they will be FULLY restored. Their health is restored, as well as any spent magic or spell slots. If they are currently experiencing some curse or other ailment, it is removed.\n\nThe pool will then stop glowing to them, but anyone who has not entered the pool still sees the glow until they themselves enter the pool.\n\nThis ability can only be used once per lunar cycle.",
        // Dead end (bad)
        21: "As soon as you step into this long and narrow corridor, the ground begins to shake. In the darkness of the far end of the corridor, you hear rocks falling and soon see that the ceiling is caving in. \n\nTons of stone and debris begin to fill the corridor, and it is quickly coming your way. The party must act quickly to dash back the way they came. Anyone who does not make it out will take 1d10 damage from the falling rocks. \nOnce the dust settles, you see that the corridor is completely buried, and trying to dig it out would be hopeless.",
        22: "[ROLL ON RANDOM PUZZLE TABLE]\n\nWhen all party members are inside the room, the door slams shut behind you, and you hear a locking mechanism engage. \n\nThe door is impossible to unlock and will only open by solving the puzzle.",
        23: "The only thing in this small room is a chest covered in dirt. The chest is locked but not trapped. Inside are four bottles of unlabeled liquid. \nMaybe it's some sort of potion?\n\nIt is not. It is poison that will leave the drinker vomiting and rolling around in agony for 1d4 hours.",
        24: "Rats scatter as you enter this dark room, and the stench of decay is inescapable. A rotting corpse of some unnamed monstrosity lies at the center of this dark room.\nBesides the corpse, there is nothing of value in this room.\n\nAs you turn to leave, you hear something approaching from the way you came in—it seems that the smell of rotting flesh has attracted something.\n[ROLL ON RANDOM ENCOUNTERS TABLE]",
        25: "A pool of knee-high water has formed in the center of this room. If a party member enters the water, they may notice something glimmering in the middle of the pool. It is a beautiful sword with an intricate hilt of silver, probably worth at least 300 gold.\n\nBut the blade is cursed. Whoever picks it up will not be able to rest for as long as they have the sword. They will be unable to find peace, and terrible nightmares of the terrors of war make it impossible to gain any regenerative effects from sleep.\n\nThe nightmares will grow more and more intense, and on the 10th restless night, they will die unless they get rid of the sword or lift the curse by some magic.",
        26: "You enter what appears to be a crypt. A large stone sarcophagus stands in the middle of the room. If the lid is moved, poisonous gas will spill out of it, and anyone in the room will take 1d6 damage unless they manage to exit the room and close the door in 1 round. \n\nIf the door remains open after the first round, the previous room will also get filled with gas, but now it will be diluted and only do 1d4 damage. If the party waits for the gas to subside, they will not find anything of value in the crypt besides old bones.",
        27: "The darkness of this large room is oppressive and unnatural. Any light, even magical, fails to illuminate more than just a few feet. If a character has darkvision, they will see a large empty room. \n\nIf a character without darkvision dares to enter the room to explore it, they will quickly lose track of where the door was and be lost in an endless void unless they figure out some clever way to find their way back.",
        28: "You enter a large, dark room with sparse furnishings. Someone—or something—was sleeping in one of the dark corners… They awake as you enter.\n[ROLL ON RANDOM ENCOUNTERS TABLE]",
        29: "This large room is completely bare except for a large statue of a man that seems to be holding up the ceiling of this room by carrying it on his back. In his eyes are two large gemstones, each worth 100 gold. \n\nIf either of them is removed, the statue will instantly crack, and any character in the room will have to act quickly to get out before the room caves in.",
        30: "You enter what appears to be some sort of jail. Cells with rusty bars line the sides of this room. There are 5+1d6 goblins in the room. It appears that they are in the middle of fighting over stolen loot.\n[ROLL ON RANDOM MUNDANE LOOT TABLE 2 TIMES]\n\nTwo goblins are having a fistfight in the middle of the room, and the others are watching and cheering them on. They have not yet noticed you enter.\n(If you want, you can also put a random NPC in one of the cells for the party to rescue.)",
        // Continue Left
        31: "The sound of dripping water echoes through this dank corridor. It continues for a few feet straight and then turns left and ends in another door.",
        32: "You enter a narrow corridor. Along the left wall, you see three doors.\n\nDoor 1 is locked and leads to a small storage room. [ROLL ON RANDOM MUNDANE LOOT TABLE 2 TIMES]\n\nDoor 2 is unlocked and leads to another storage room that contains nothing of value.\n\nDoor 3 is unlocked and leads on to the next room.",
        33: "You enter a large room lined with pillars. The walls are adorned with frescoes depicting ancient rituals. There is a door in the middle of the wall to your left.\n\nThe frescoes have been crudely vandalized in various unflattering ways. Based on the height of the paint, you think that it was probably done by kobolds or maybe goblins.",
        34: "This large room has been completely upended. The stone floor has been demolished with pickaxes, and a large pit of dirt and sand takes up the center of the room.\n\nClose inspection reveals that this is some sort of archaeological excavation site (probably abandoned due to the nearby monsters) and that someone was digging for ancient treasure buried beneath this dungeon.\n\nBesides this, there is another door to your left.\n\nIf the players want to dig for treasure, they will have to dig for quite a while. It will take 1d8 hours, and you will ask them each hour if they want to continue. For each hour of digging, roll 1d4; on a 4, you roll a random encounter as someone or something is drawn to the sound.\n\nIf they do reach the end of their dig, they are rewarded 100 gold + [ROLL ON THE RANDOM TREASURE TABLE ONCE].",
        35: "This corridor continues ahead for a while and then splits off to the right and to the left. The path leading to the right has been caved in and looks like it would not be possible to dig through, but the path to the left is open and leads to another door.",
        36: "You enter what appears to be some sort of sleeping quarters, though it looks like a hurricane has passed through this room. The furniture is tossed around and shattered. \nTo your left, there's a door in the wall.\n\nIf the party investigates the room to find out what happened here, they may find a dead bandit crushed underneath a pile of rubble. In his hands are two magic scrolls, one opened and one yet sealed.\nIf the scrolls are investigated by someone who is familiar with such items, they will see quite obviously that the scrolls are poorly made and extremely volatile. \n\nThere is no telling what would happen if the seal was broken on the remaining scroll, but it would probably be painful.",
        37: "This corridor is seemingly under construction or restoration. There are support pillars and scaffolding everywhere, but whoever was doing the work is seemingly not here right now. \n\nThe corridor continues straight, then turns left, and ends in another door.",
        38: "You enter a large room, in the middle stands some sort of puzzle.\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nWhen the puzzle is solved, a secret passage opens in the wall to the left from the direction you entered.",
        39: "Thick fog covers this room, its origin a mystery to you. The fog is so thick that you cannot even see your feet when you look down.\n\nThe floor in this room is covered in traps scattered at random places. Every time a character steps one square into a previously unoccupied space, roll 1d4 to see if there was a trap there. \nIf there was a trap, give them a DC 10 chance to avoid it. (Either by spotting it before they step or jumping back last minute, up to you)\n\nEach trap deals 1d4 piercing damage as a spike shoots up from the floor. A previously stepped-on square is safe, and traps only trigger once.\n\nIf they reach the wall straight ahead from where they entered, they will find a gargoyle statue mounted in the center of the wall. The fog is emanating from its mouth, and covering its mouth with something or shoving something into its mouth will clear the fog in just a few minutes.\nThen they will clearly be able to see the floor and be able to navigate the room safely without risking any more traps.\n\nIf they reach the wall to the left of where they entered, they will find a door in the middle of the wall leading to the next room.",
        40: "This corridor is 10 feet wide, it continues straight and then turns left.\n\nThere is a trap occupying the bend of this room. The entire 10x10 square feet that make up the bend of this room are covered in a magical trap, and if stepped on, it will release a burst of green flame that deals 1d8 damage to anyone in the space. Though the trap is quite easy to notice, especially for magic users.\n\nAt the end of the corridor is a door leading to the next room.",
        // Continues ahead
        41: "You enter a large circular room with a domed ceiling, at the center you see...\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\nAt the far end of the dome, you see another door that looks to be barred with some sort of mechanism.\n\nThe barred door on the other side opens by solving the puzzle. If the players attempt to open the door without solving the puzzle, they can certainly try with a DC of 23.",
        42: "You enter a large chamber; there is not much of note here besides a large iron candelabra that has fallen from the ceiling after its rope gave way.\n\nOn the opposite side of the room, you see another door, slightly ajar. As you near the center of the room, you hear noises coming from beyond the ajar door.\n\nThe door is slowly pushed aside as someone or something enters the room.\n[ROLL ON RANDOM ENCOUNTERS TABLE]",
        43: "This straight, narrow corridor has been caved in, however, the damage is not too bad. You can see through the rubble to the door on the other side, and with a little effort, you could make it through.\n\nIf the party tries to lift the rubble out of the way by force, it will take 1d10 minutes. If they have some suitable tool that could make it easier, like pickaxes, it will instead take 1d6 minutes. If they use magic, it may or may not be resolved instantly depending on the magic.\n\nRegardless of their methods, if they take longer than 1d12 minutes to resolve it, the noise will attract a random encounter that will attack them from behind.\n\nIf there are no unexplored paths behind them when the random encounter happens, and they question where the ambush came from, simply add a secret hidden door somewhere behind them that now stands open. This is where the attackers came from, and now the party has yet another path to explore!",
        44: "This straight corridor is dark and damp; you see a door at the end of it. You see that on both the door at the end of the corridor as well as on the door behind you, the same symbol is depicted – a symbol for the four elements.\n\nThere are four traps evenly spaced in the room. They are not very hard to spot (DC 10) and the DC decreases by 1 for each trap that has previously been spotted. Once spotted, the DC for disarming them is 12 each, and the DC to clear them without triggering them is 12 each.\n\nEarth trap – A tripwire extends across the corridor about a foot from the floor. If the tripwire is sprung, rocks will fall from the ceiling, dealing 1d6 damage.\n\nWind trap – This trap is sprung by a pressure plate in the floor. When this is stepped on, spikes will jut out of the ceiling above the pressure plate. But instead of the spikes coming down to strike the player, a magical wind will occupy the space of the pressure plate, lifting the player up into the air and throwing them towards the spikes like a leaf in the wind for 1d6 damage.\n\nWater trap – This trap consists of two magic glyphs on opposite sides of the walls. If a player steps between the glyphs, they will suddenly be trapped inside a 10 feet by 10 feet by 10 feet cube of water that completely takes up the area from wall to wall, floor to ceiling. Inside the cube are strong currents that make the player inside spin and tumble like crazy. They can attempt to swim out, but it will be a great feat of strength to swim against the currents.\n\nThe easiest way to get out would be if somehow aided by another player outside the cube. Like if they gave them something to grab onto and then pulled them out.\nConsult your rule set to determine how long your player can remain underwater.\n\nFire trap – This trap is simply a pressure plate that, when stepped on, bursts into flames, dealing 1d6 damage.",
        45: "A long dark corridor stretches out ahead of you that ends in a door on the other side, nothing of note here.",
        46: "You enter a large hexagonal room; at its center, you see...\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nAt the far end of the dome, you see another door.\n\nThe door in the other end of the room is unlocked, and the party can simply continue through to the next room if they want to.\n\nIf they choose to solve the puzzle, the puzzle will instead unlock a trapdoor in the floor that will reveal a treasure chest with silver bars that are worth 1d4x100 gold.",
        47: "You enter a dark corridor that leads to a door straight ahead of you.\nYou hear movement in the darkness…\n\n[ROLL ON RANDOM ENCOUNTERS TABLE]",
        48: "This small room is lit by two small braziers, filled with glowing embers.\nAt the other end of the room, you see…\n\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nSolving the puzzle will make it magically disappear, revealing a door.",
        49: "This room is divided by a…\n\nRoll 1d6 to determine what divides this room.\n\n1. Stream of water that emanates from barred openings on either side.\n2. Cavernous pit that is so deep you cannot see the bottom.\n3. River of lava slowly flowing through a dug canal.\n4. Stream of mysterious glowing liquid.\n5. A river of blood that pours in and out of industrial-sized pipes.\n6. A chasm filled with an ominous green light.\n\nA bridge once stood in the middle of the room, allowing passage from your side to the other. But the bridge has fallen and now only a jagged stone pillar stands where once the bridge had its central support column.\n\nJumping across is not difficult at all (DC 6), but use your imagination to determine what happens if they fail.",
        50: "You enter a large room that seems to have been some sort of scriptorium.\nDesks are scattered around the room, and across the room on the other side, you see another door.\n\nThe wall to the left is covered in shelves filled with scrolls.\n\nIf the players investigate the scrolls, they will find that they are not very interesting, mostly weather reports, meeting notes, and other mundane documents.\n\nOn the right side of the room, you see a broken staircase leading up to a balcony overlooking the room. The staircase is collapsed and reduced to a pile of rubble.\n\nIf the players climb to the balcony, they will find a locked door (DC 15 to break or lockpick).\nThe door leads to a small room with a desk and a small chest containing 1d20 gold + [ROLL ON THE RANDOM TREASURE TABLE ONCE].",
        // Continues right
        51: "You enter a large, seemingly empty room. There is another door to your right, but other than that, the walls are bare. The domed ceiling is held up by four large pillars.",
        52: "The sound of dripping water echoes through this dank corridor. It continues for a few feet straight and then turns right and ends in another door.",
        53: "You enter a circular room, its walls covered in shelves with books. There is another door to your right.\nIn the center of the room stands a raised platform, and at its center mounted to the floor is a large telescope pointed at the ceiling.\n\nIf the players explore the bookshelves, they will find that they are all notebooks on astrology. As they go on, they get more and more deranged, and by the end they are just mad ramblings about the stars not being right. There are also various items scattered among the shelves.\n[ROLL ON RANDOM MUNDANE LOOT TABLE 2 TIMES]\n\nIf the players look through the telescope, they will see a clear night sky. The stars and moon indicate that what they are seeing is the current sky above the dungeon. The telescope always works despite the time of day or weather conditions, and it always gets a clear view of the stars above. The telescope is mounted fast to the platform and cannot be removed without risking damaging it.\n\nIf the players try to use the telescope to see through walls of the dungeon, they will find that the telescope cannot be tilted down beyond a 45-degree angle; it is always pointed upwards towards the ceiling. It can swivel and look at any point of the ceiling but cannot be tilted down from it.",
        54: "You enter a long corridor. There are two doors to your left and three to your right.\n\n1st door left does not move. The room beyond has caved in, and huge boulders are pressing against the door, keeping it shut.\n\n2nd door left: If you enter this door, you come out through the 1st door to the right unless the spell is broken. If the spell is broken, this just becomes a small storage unit with little of value.\n\n1st door right: If you enter this door, you come out through the 2nd door to the left unless the spell is broken. If the spell is broken, this becomes a small room with a hidden treasure containing 200 gold + [ROLL ON THE RANDOM TREASURE TABLE ONCE]!\n\n2nd door right continues on to the next part of the dungeon.\n\n3rd door right leads to a small room that is completely caved in.",
        55: "You enter a narrow dark corridor that continues ahead then turns right. In the bend of the corridor stands a statue of a two-headed dragon, each head pointed down in either direction of the corridor.\nAt the other end, beyond the bend and out of view when they enter, there is another door. But there are also two traps in the corridor, both located 15 feet from each door.\n\nBoth traps are simple pressure plates that are easy to spot, easy to disarm, and easy to jump over (the DC is 11 for all of them), but if triggered, fire will spew out of both of the statue’s mouths, completely engulfing the corridor in flames, dealing 1d10 damage to anyone in the corridor.",
        56: "You enter a large rectangular chamber that appears to have been some sort of alchemical laboratory. Tables filled with smashed glass bottles and vials are scattered across the room. The room has clearly been ransacked recently, and judging by the smell, it was probably ransacked by goblins.\nThere is another door in the wall to your right.\n\nIf the players want to investigate the lab, they will find a wizard's notebook where he describes his many experiments where he tried and failed to turn lead into gold. If they do spend a lot of time searching or roll exceptionally high, they might find a book hidden away under a desk where the wizard has written down the research that actually did work! You can reward the players with an alchemical recipe for how to turn gold into lead (and thereby lose 90% of its value).",
        57: "The ceiling of this corridor is partially collapsed, and the rest is being held up by rickety scaffolding. As you make your way right around the bend, you see the door at the end of the corridor. Yet a glance at the ceiling between you and the door makes you doubt that you will be able to make it there…\n\nThe ceiling will hold just fine as long as the players don’t do anything stupid or roll incredibly poorly. If something bad happens, rocks will fall, dealing 1d10 damage.",
        58: "This room seems to be some sort of training hall. There are blunt weapons scattered here and there, and in the middle of the room is a large octagonal platform. In the middle of the platform lies a large pile of rocks. You see another door to your right.\n\nIf a player enters the octagon, the pile of rocks will swirl to life and take on the shape of a humanoid and start to fight. It is not very strong (no attack bonus and only deals 1d4 damage), but it has infinite HP and will never yield until the player leaves the octagon. Only then will it collapse back into a pile.",
        59: "You enter a large, unassuming room. It is completely empty save for some debris, and you see another door to the right.",
        60: "You enter what appears to be a dead-end. A large octagonal room with bare stone walls. In the center of the room, you see...\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nSolving the puzzle will make a door magically appear in the wall to the right.",
        // Continues left & ahead
        61: "You enter a dark corridor that stretches out ahead of you. Straight ahead, you see another door, and halfway down the corridor, you see another partway leading left to yet another door.",
        62: "You enter a long straight corridor that seems to connect this part of the dungeon to some other part further ahead. In the other end, you see another door.\n\nHalfway down the corridor, there is a hidden passage to the left. A keen-eyed player can easily notice it (DC 12), for example, if they search for traps. The hidden passage is accessed by flipping a sconce upside down. This will make a section of the wall open up and reveal a path that leads to yet another door.",
        63: "You enter a corridor with two doors, one straight ahead and one to your left. The wall to your right is engraved with scenes of a battlefield where armies fight with dragons and beasts.\n\nThere is a trap in the corridor right in the middle in front of the door leading to the left. The trap consists of a pressure plate, and when it is activated, poisonous darts will shoot out of small holes in the engravings in the wall, dealing 1d12 damage.\n\nThe trap and the dart holes can be discovered with a DC of 12 and disarmed with a DC of 14.",
        64: "You enter a T-shaped corridor, there is one door straight ahead of you and one more to your left. The wall to your left is covered in crude drawings and inappropriate words. Judging by the height of the vandalism, you think it was probably done by goblins or kobolds.\n\nRoll 1d4:\n1. There is a group of 1d6 goblins here happily painting on the wall.\n2. There is a group of 1d6 kobolds here happily painting on the wall.\n3. The corridor is empty.\n4. There are two disgruntled bandits here, tasked with cleaning up.",
        65: "You enter a T-shaped corridor, there is one door straight ahead of you and one more to your left.",
        66: "You enter a circular room, in the center, you see...\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nThere is another door to your right. Above it, you see the number 1, and above the door you just came through, you see the number 2.\n\nIf the players try to open door number 1 without solving the puzzle, they will find that there is just a stone wall immediately on the other side.\n\nSolving the puzzle will cause the walls in this room to rotate clockwise 180 degrees. Meaning that door number 1 is now in the wall that was to their left when they came in, and door number 2 is on the opposite wall of where they entered. The puzzle will then magically reset, and if solved again, it will once again flip back 180 degrees into its original orientation.",
        67: "You enter a room that appears to have recently been repurposed into improvised living quarters. There are bedrolls and other items scattered here, as well as a small fireplace that seems to have been lit maybe a few days ago. Whoever was here seems to have left in a hurry.\n\nIf the players investigate the room closely, they will find signs of a fight. There are bloodstains and broken arrows here and there, and if they are looking for loot, they will find 6 bedrolls, enough food to sustain the party for 1d6 days, and [ROLL ON RANDOM MUNDANE LOOT TABLE 6 TIMES].",
        68: "You enter a square room with a door in each direction; however, the door to your right is smashed to pieces, and the room beyond it has caved in completely.",
        69: "You enter a nice room filled with frescoes and beautiful statues. There is a door in the wall ahead of you and one to your left.",
        70: "The foundation under this room seems to have shifted, the entire room is crooked and tilted to the side.\n\nThere is a door to your left as well as one ahead of you, but due to the state the room is in, the floor in front of the door ahead of you has sunken by 8 feet, and the door is difficult to reach.\n\nThe door to the left is unlocked, but the door ahead is locked with a mundane lock (DC 11). If a player tries to lockpick it, they would first need to figure out how to get up there and stay up there for long enough to pick the lock. There is no edge by the door frame to stand on; the door is flush with the wall, so they will have to get creative.",
        // Continues ahead & right
        71: "You enter a dark corridor that stretches out ahead of you. Straight ahead, you see another door, and halfway down the corridor, you see another partway leading right to yet another door.",
        72: "You enter a long straight corridor that seems to connect this part of the dungeon to some other part further ahead. In the other end, you see another door.\n\nHalfway down the corridor, there is a hidden passage to the left. A keen-eyed player can easily notice it (DC 12), for example, if they search for traps. The hidden passage is accessed by flipping a sconce upside down. This will make a section of the wall open up and reveal a path that leads to yet another door.",
        73: "You enter a T-shaped corridor where you have a door straight ahead, and halfway down the corridor, there is another path that goes down to the right and leads to yet another door.\n\nIn the middle of the corridor, where the two paths meet, there is a trap. The trap is triggered by a tripwire that is strung up one foot from the floor just in front of the intersection in all three directions. If there is plenty of light or the players have darkvision, the tripwire is easily spotted (DC 12).\n\nWhen the trap is triggered, it will open a trap door in the floor that reveals a 10 feet deep pit. There are no spikes at the bottom, just a hard stone floor, and a fall would cause 1d12 damage. The walls of the pit are smooth and covered in grease to make climbing as hard as possible. Without aid, the climb would have a DC of 18, but with help from someone outside the pit, it becomes much easier.",
        74: "The corridor ahead of you descends down into murky water. The corridor is flooded, and the stairs before you disappear down into the water.\n\nIf the players dive into the water, they will find that halfway down the corridor, there is another path leading off to the right, as well as the path that continues straight ahead.\n\nBoth the path to the right and the path straight ahead lead to a set of stairs that ascend up out of the water on the other side and lead to doors that continue further into the dungeon.",
        75: "You enter a large room, and there is another door on the opposite side of the room. In its center, you see...\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nThe door ahead is unlocked and can be opened without solving the puzzle. Solving the puzzle will open a hidden secret door on the wall to the right from the perspective of where the party entered the room.",
        76: "You enter a room with an arched ceiling supported by four pillars. There is a door straight ahead and one to the right.\n\nThe pillar to the right from the direction the party came in has a small (easily missed) inscription on it that just says “HERE.” If the players inspect the pillar closely, they will find it is hollow, and inside it, there is 20 gold.",
        77: "As you open the door to this room, you are met with a wall of impenetrable darkness. The room is somehow filled with unnatural darkness, rendering it completely void of light.\n\nAnyone inside this room is completely blind. No light source or darkvision will help. They will have to search the room best they can to find their way. There is one door to their right as they enter and one straight ahead.\n\nAt the center of the room, there is a crystal orb mounted on a pedestal. The orb is fastened to the pedestal and cannot be removed without destroying it. If the orb is destroyed, the darkness disappears, and the room becomes normal. … This sure would make for a fun place for a random encounter...",
        78: "You enter a room that has partially collapsed. The left side of the room is completely caved in and is reduced to a pile of rubble. Ahead, you see a door as well as one door to your right.",
        79: "You enter a room full of crates. On either side of the room, there are boxes stacked to the ceiling, and a path has been cleared to the other side of the room where you see another door.\n\nIf the players start searching the crates, roll 1d20 for every crate they open:\n1-14: worthless junk, stuff that is rotten or weathered by age.\n15-19: [ROLL ON RANDOM MUNDANE LOOT TABLE ONCE]\n20: [ROLL ON THE RANDOM TREASURE TABLE ONCE].\n\nThere are 10 crates in total that they can open. If they ask for more, just say that the rest contain junk.\n\nIf the players want to open more than 5 crates, you can tell them that as they remove the crate from the stack, they see a door that was previously covered by all the crates. The door is in the wall that was to the right when they came in.",
        80: "This perfectly cubic room has the same measurements in every dimension. There is a door ahead of you in the center of the opposite wall as well as one in the middle in the wall to your right.",        
        // Continues left & right
        81: "You enter a T-shaped corridor that continues straight for a bit, then breaks off left and right. At the end of either end, you see a door.",
        82: "You enter a T-shaped corridor that continues straight for a bit, then breaks off left and right. At the end of either end, you see a door.\n\nThere are 3 traps in this corridor, each one located 10 feet from either door. All traps are simple trap doors in the floor that, when stepped on, will reveal a pit full of spikes. The spikes are old and rotten, so they do not do as much damage as you would think, as most just crumble, but a fall still deals 1d6 damage. The trap doors are spotted with a DC of 13.",
        83: "You enter a T-shaped corridor that continues straight for a bit, then breaks off left and right. At the end of either end, you see a door.\n\nAt the intersection, there is a small alcove in the wall where you see a chest.\n\nThe chest is locked and booby-trapped. With careful inspection (DC 15), you can see that there is a hidden mechanism inside the lock designed to trigger if someone tries to lockpick the chest. Disarming the trap is a DC of 14.\n\nIf a player tries to pick the lock without disarming the trap, they will find that it is extremely difficult (DC 20). If the player fails, there is a flash of light inside the chest, and smoke starts to come out through the lock and the hinge as whatever was stored inside is burnt to ash.\n\nIf the players try to pick the lock after disarming the trap, it will be much easier (DC 13), and inside they will find an old grimoire that, to the right collector, would fetch a price of 1d20 x 100 gold!\n\nIf a magic user wants to keep the grimoire, it will contain 3 spells of every level up to one level above the player's current ability. So if a player can cast level 3 spells, there are spells up to level 4 in the book. You choose the spells yourself or roll for it… you’ll figure it out!",
        84: "You enter a rectangular room that is twice as wide as it is long. You see a door at either end of the room to your right and left.",
        85: "You enter a circular room, and in the middle of the room, you see...\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nAcross on the other side of the room, you see an alcove where a statue of a jester smiles at you. Perceptive players may notice that the alcove across on the other side of the room and the door that they just entered both have the exact same archway around them.\n\nSolving the puzzle will cause the walls of the room to rotate clockwise 90 degrees. This will make the alcove and the door that the party entered through inaccessible, but reveal two new doors to the left and right. The puzzle will then reset, and for every time the puzzle is solved, the process repeats and the walls rotate 90 degrees.",
        86: "This room has a large cavity that splits it diagonally, dividing the lower right end of the room from the upper left. To your right, you can see a door, and to your left, you see another, though this door is on the far side of the cavity.\n\nJumping the cavity is easy (DC 10). Falling down is really bad… most likely lethal.\n\nIf the dungeon has multiple floors, the cavity could open up to another room below. But if you’re just working with one floor, the cavity opens up to an endless void. (Non-Euclidean architecture is fun!)",
        87: "You enter a long room, and at its middle, it stretches out to either side. This long room is supported by eight pillars, four to your left and four to your right, arranged in two lines. At the far ends of the room, you see two doors.",
        88: "This relatively small room seems to have recently been repurposed into a smithy. A makeshift forge has been constructed, and there are tools and material scattered here and there. There is not much in terms of ventilation, so the ceiling and walls are covered in a thick layer of soot. There are three doors in the room. Besides the one you came in through, you also see one to your left and one to your right.\n\nIf the player wants to loot the smithy, they will find 1d6 iron ingots, 1d4 daggers, an axe head with no handle, and [ROLL ON RANDOM MUNDANE LOOT TABLE 2 TIMES].",
        89: "You enter a mostly featureless room. You see a door to your left and one to your right.",
        90: "The ceiling in the center of this room has collapsed, resulting in a 5 feet high pile of rocks and rubble occupying the middle of the room. You see a door to your left and one to your right.",
        // Continues left & ahead & right
        91: "You enter a corridor that is shaped like a cross. You see a doorway ahead of you at the other end, and halfway there, you see paths leading off left and right to other doors.",
        92: "You enter a perpendicular intersection of hallways. Ahead, you see a door at the far end, and the intersecting hallway is located at the halfway point, leading to doors at either end.\n\nThe middle intersecting part of the corridor is trapped. It is a pressure plate (easily spotted with a DC 12) that, when stepped on, will cause the walls to start contracting in all directions. The mechanism is old and not fully functional, so the characters have 1d4 rounds of movement to get back to cover, giving them (hopefully) enough time to not get crushed to death. Once the walls have completely contracted, they will slowly begin to move back to their original position.",
        93: "A long, dark corridor stretches ahead of you, ending in a door on the other side, nothing of note here.\n\nThere is, in fact, something of note. There is an intersecting corridor located halfway down, leading to doors at either end. But this intersecting corridor is hidden with illusory magic, disguising it as a plain wall. If a player has a way of seeing through illusions, they will be able to see the hidden corridor. If someone were to touch the illusory wall, they would pass through it.",
        94: "You enter a large room, and at its center, you see...\n[ROLL ON THE RANDOM PUZZLE TABLE ONCE]\n\nAcross on the other side of the room, you see a steel door that is barred with a sturdy mechanism. There are also two other doors on either side of the room, to your left and right, but these are not barred as far as you can see.\n\nSolving the puzzle will trigger the mechanism that is barring the steel door. Both of the other doors to the sides are locked, but easily picked (DC 12).",
        95: "This circular room has a door at every 90 degrees—one behind you, one straight ahead, one to your left, and one to your right.",
        96: "You enter a large room with a concave floor. The foundation seems to have given way, leading to a bowl-like depression in the floor that has filled with murky, foul-smelling water. You see a door in either direction—one straight ahead and one to either side.\n\nIf a player enters the water, it will reach 2 feet at its deepest point. The floor under the surface is slimy and slippery to walk on. There is plenty of room to walk around the water if the players do not want to enter it, and they can easily reach all doors without getting wet.\n\nIf a player starts to search the water, roll 1d20, but only once, regardless of how long they search or how many players want to roll:\n\n1: They disturb a giant snake that attacks them!\n2-9: They find nothing.\n10-15: [ROLL ON RANDOM MUNDANE LOOT TABLE ONCE]\n16-19: [ROLL ON RANDOM MUNDANE LOOT TABLE 2 TIMES]\n20: [ROLL ON THE RANDOM TREASURE TABLE ONCE]!",
        97: "This room seems to have once been some sort of exhibition. Statues and ornaments once filled this hall, now the few that remain are broken and scattered. Empty hooks on the wall give you an impression that the walls were once adorned with paintings and tapestries. You see a door in either direction, one straight ahead, and one to either side.",
        98: "You enter a circular room with a domed ceiling. The walls are adorned with intricate frescoes depicting ancient myths.\n\nBesides the door you just entered, there are three more doors in this room. One straight ahead, one to your left, and one to your right.",
        99: "You enter a large chamber that smells like house fire. The furniture has been burnt beyond recognition, and the ceiling and walls are scorched and covered in soot. You see a door in either direction, one straight ahead, and one to either side. As you enter the room, your steps disturb the ash that covers the floor, revealing the checkered black-and-white floor beneath.\n\nThe floor is not trapped, but it is fun if the players think it is. If they spend a lot of time looking for loot in this room, roll 1d20. They find nothing except if they roll a 20. If they roll a 20, they find a can of paint that has miraculously survived the fire. If they open the paint can, they will find that it contains black-and-white checkered paint. When applied to a surface, it will paint that surface in the same checkered pattern as adorns the floor of this room. If they ask how it works, just say a wizard did it.",
        100: "You enter a small, claustrophobic room, barely large enough for the four doors that adorn it, one in either direction.\n\nWouldn’t it be fun to have a random encounter here? It would be like fighting in a phone booth!"
        };
    return descriptions[number] || "Invalid number. Please enter a number between 1 and 100.";
}


function getRandomEncounter() {
    return getEncounter(Math.ceil(Math.random() * 20))
}

function getEncounter(number) {
    const encounter = {
        // Dead end (neutral)
        1: Math.ceil(Math.random() * 10) + " Kobolds",
        2: Math.ceil(Math.random() * 8) + " Goblins",
        3: Math.ceil(Math.random() * 4) + " Giant spiders",
        4: Math.ceil(Math.random() * 6) + " Bandits",
        5: "A bandit captain",
        6: Math.ceil(Math.random() * 4) + " Berserkers",
        7: Math.ceil(Math.random() * 4) + " Cultists",
        8: Math.ceil(Math.random() * 4) + " Swarms of rats/insects/snakes",
        9: Math.ceil(Math.random() * 8) + " Gnolls",
        10: Math.ceil(Math.random() * 4) + " Giant constrictor snakes",
        11: Math.ceil(Math.random() * 6) + " Zombies",
        12: "A Cyclops",
        13: Math.ceil(Math.random() * 8) + " Skeletons",
        14: Math.ceil(Math.random() * 6) + " Orcs",
        15: "An Ogre",
        16: Math.ceil(Math.random() * 4) + " Minotaurs",
        17: Math.ceil(Math.random() * 4) + " Manticores",
        18: "A Troll",
        19: Math.ceil(Math.random() * 4) + " Ghosts",
        20: "A dragon! Scale its stats/size/type to your players level. Make it dangerous!"
        };
    return encounter[number] || "Invalid number. Please enter a number between 1 and 20.";
}

function getRandomFlair() {
    return "flair not yet implemented..."
}