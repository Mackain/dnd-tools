
const hexDiameterInMiles = 6;
var neerDoWell = "";

function startQuest() {
    var quest = getRandomQuestGiver() + " wants you to " + getRandomQuestTask() + ", so that they can " + getRandomQuestGoal();
    
    // calculate dungeon location (if there is one)
    if (quest.includes("dungeon")) {
        console.log("Dungeon found!")
        quest += "</br></br><i>The dungeon is " + randomizeLocation()+"</i>";
    } else if (neerDoWell != "") {
        console.log("No dungeon, but enemies!!")
        quest += "</br></br><i>The "+ removeFirstWord(neerDoWell) +" can most likely be found " + randomizeLocation()+"</i>";
    }
    
    
    printOutput(quest)
}

function printOutput(output) {
    document.getElementById("text-area").innerHTML = output;
}

function randomizeLocation() {
    var direction = "";
    var distance = Math.ceil(Math.random() * 20);

    switch(Math.ceil(Math.random() * 8)) {
        case 1:
          direction = "North"
          break;
        case 2:
            direction = "Northeast"
          break;
        case 3:
            direction = "East"
          break;
        case 4:
            direction = "Southeast";
          break;
        case 5:
            direction = "South";
          break;
        case 6:
            direction = "Southwest";
          break;
        case 7:
            direction = "West";
          break;
        default:
            direction = "Northwest";
          break;
    }
    
    return distance + " hexes (" + (hexDiameterInMiles * distance) +" miles) to the " + direction;
      
}

function removeFirstWord(str) {
    return str.split(' ').slice(1).join(' ');
}

// ████████╗ █████╗ ██████╗ ██╗     ███████╗███████╗
// ╚══██╔══╝██╔══██╗██╔══██╗██║     ██╔════╝██╔════╝
//    ██║   ███████║██████╔╝██║     █████╗  ███████╗
//    ██║   ██╔══██║██╔══██╗██║     ██╔══╝  ╚════██║
//    ██║   ██║  ██║██████╔╝███████╗███████╗███████║
//    ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝
function getRandomQuestGiver() {
    return getQuestGiver(Math.ceil(Math.random() * 20))
}

function getQuestGiver(number) {
    const questGiverTable = {
        1: "The local drunk",
        2: "A group of locals, who have banded together",
        3: "An old local on their deathbed",
        4: "A traveling merchant",
        5: "A person from your past, who reached out trough letter delivered by courier",
        6: "A traveling bard who is passing trough the region",
        7: "A retired old adventurer",
        8: "A local druid",
        9: "A local cleric",
        10: "A local wizard",
        11: "A noble",
        12: "The town elder",
        13: "A worried parent",
        14: "The blacksmith",
        15: "A prospering shopkeeper",
        16: "A struggling shopkeeper",
        17: "The captain of the local guard",
        18: "A local representative of a guild",
        19: "A mysterious stranger, who have secretly aided you for some time now",
        20: "A god who appears before you"
    };
    return questGiverTable[number] || "Invalid number. Please enter a number between 1 and 20.";
}

function getRandomQuestTask() {
    return getQuestTask(Math.ceil(Math.random() * 20))
}

function getQuestTask(number) {
    const questTaskTable = {
        1: "slay/route out " + getRandomNeerDoWell(),
        2: "recover an artifact stolen by bandits",
        3: "escort a scholar to the inner sanctum of a dungeon where they must translate a fresco",
        4: "defeat " +getRandomNeerDoWell()+" who moved into nearby dungeon.",
        5: "stop " +getRandomNeerDoWell()+" from achieving their goal",
        6: "find their ancient family signet ring in a nearby dungeon, that will prove their nobility",
        7: "find an ancient library of lost lore in a nearby dungeon",
        8: "find proof that " +getRandomNeerDoWell()+" is innocent and misunderstood",
        9: "find proof that " +getRandomNeerDoWell()+" was behind a recent murder",
        10: "rescue (or at least recover the remains of) an adventurer who got lost in a dungeon",
        11: "clear out all threats in a nearby dungeon so it can be repurposed for good",
        12: "rescue their family member from " +getRandomNeerDoWell()+"",
        13: "escort a valuable transport carrying an artifact trough dangerous lands.",
        14: "find a scroll in a nearby dungeon. But under no circumstances must you read it!",
        15: "find an artifact that was lost as it was being transported here",
        16: "defeat " +getRandomNeerDoWell()+" and find out what they are up to",
        17: "stop " +getRandomNeerDoWell()+" from macing a deal with a devil",
        18: "recover an artifact lost in a dungeon",
        19: "recover a powerful grimoire, that was stolen by an evil necromancer",
        20: "slay a dragon!",
    };
    return questTaskTable[number] || "Invalid number. Please enter a number between 1 and 20.";
}

function getRandomQuestGoal() {
    return getQuestGoal(Math.ceil(Math.random() * 20))
}

function getQuestGoal(number) {
    const questGoalTable = {
        1: "because it is the right thing to do",
        2: "for glory",
        3: "so they can die in peace",
        4: "so that they can achieve their life goal",
        5: "because they saw it in a vision",
        6: "to piss of their rival",
        7: "to further their secret agenda",
        8: "to clear their family name",
        9: "to regain their honor",
        10: "to prove the locals wrong",
        11: "for justice",
        12: "to gain knowledge and power",
        13: "to gain influence over local rulers",
        14: "to avenge their loved one",
        15: "for revenge",
        16: "because they swore an oath",
        17: "so that they can die in peace",
        18: "so that they can prove their innocence",
        19: "out of greed",
        20: "because f**k you, that's why!"
    };
    return questGoalTable[number] || "Invalid number. Please enter a number between 1 and 20.";
}


function getRandomNeerDoWell() {
    neerDoWell = getNeerDoWell(Math.ceil(Math.random() * 20));
    return neerDoWell;
}

function getNeerDoWell(number) {
    const neerDoWellTable = {
        1: "A group of kobolds",
        2: "A group of goblins",
        3: "A group of ogres",
        4: "A group of bandits/highwaymen/pirates",
        5: "The ghost of a evil ruler from the regions dark past",
        6: "A vampire who was awoken from their slumber when adventurers disturbed their tomb",
        7: "A Medusa",
        8: "A werewolf",
        9: "A band of orc raiders",
        10: "A group of lizardmen who recently came to the area from elsewhere",
        11: "A hag who has lived nearby for centuries, but only recently started to terrorize the locals.",
        12: "A demon who has possessed a local",
        13: "A group of deserters turned bandits, lead by their former captain",
        14: "An ancient witch",
        15: "A crime-lord who wants to expand their territory into the local area",
        16: "A death cult who believes the world will end and only a powerful demon can save them",
        17: "A mad mage, turned insane from studying forbidden knowledge",
        18: "A necromancer with their hoard of undead",
        19: "A secret cabal of vampires",
        20: "A Dragon"
    };
    return neerDoWellTable[number] || "Invalid number. Please enter a number between 1 and 20.";
}



