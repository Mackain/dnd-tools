
const hexDiameterInMiles = 6;
var questIndex = 0;
var neerDoWell = ""
function startQuest() {
    // do this here to only do it once and save compute.
    neerDoWell = getRandomNeerDoWell();
    var quest = getRandomQuestGiver() + " wants you to " + getRandomQuestTask() + ", " + getRandomQuestGoal();
    // calculate dungeon location (if there is one)
    if (quest.includes("dungeon")) {
        console.log("Dungeon found!")
        quest += "</br></br><i>The dungeon is " + randomizeLocation()+"</i>";
    } else if (questHasNeerDoWell()) {
        console.log("No dungeon, but enemies!!")
        quest += "</br></br><i>The "+ removeFirstWord(neerDoWell) +" can most likely be found " + randomizeLocation()+"</i>";
    }
    
    printOutput(quest)
}

function questHasNeerDoWell(){
    const specialQuests = [1, 4, 5, 8, 9, 12, 16, 17]; 
    if (specialQuests.includes(questIndex)) {
        return true;
    } else {
        return false;
        }
    }

function printOutput(output) {
    document.getElementById("text-area").innerHTML = output;
}

function printHex(wilderness) {

    var hexOutput = ""
    var addition = "";
    
    hexOutput += getRandomHex(wilderness);
    

    if (wilderness) {
        switch(Math.ceil(Math.random() * 8)) {
            case 1:
                addition = "You see a farmstead in the distance, alone in the wilderness."
                break;
            case 2:
                addition = "Nothing out of the ordinary."
                break;
            case 3:
                addition = "Nothing out of the ordinary."
                break;
            case 4:
                addition = getRandomEvent();
                break;
            case 5:
                addition = getRandomEncounter();
                break;
            case 6:
                addition = getRandomEncounter();
                break;
            case 7:
                addition = getRandomEncounter();
                break;
            default:
                addition = getRandomEncounter();
                break;
        }
        
    } else {
        switch(Math.ceil(Math.random() * 12)) {
            case 1:
                addition = "You also see a farmstead in the distance.";
                break;
            case 2:
                addition = "You pass near a hamlet.";
                break;
            case 3:
                addition = "You pass trough a village.";
                break;
            case 4:
                addition = "You pass trough a town";
                break;
            case 5:
                addition = "Nothing out of the ordinary.";
                break;
            case 6:
                addition = "Nothing out of the ordinary.";
                break;
            case 7:
                addition = getRandomEvent();
                break;
            case 8:
                addition = getRandomEvent();
                break;
            case 9:
                addition = getRandomEvent();
                break;
            case 10:
                addition = getRandomEncounter();
                break;
            case 11:
                addition = getRandomEncounter();
                break;
            default:
                addition = getRandomEncounter();
                break;
        }
    }

    document.getElementById("hex-text-area").innerHTML = hexOutput + "</br></br>" + addition;

}

function getRandomEvent() {
    var encounter = "";

    switch(Math.ceil(Math.random() * 20)) {
        case 1:
            encounter = "You come across a traveling merchant going the other way that offers you a look at their wares.";
            break;
        case 2:
            encounter = "You meet an alchemist who is out gathering herbs for their potions. They live nearby and can be convinced to offer you shelter for the night and perhaps even sell you a potion or two."
            break;
        case 3:
            encounter = "You meet a local hunter who has been lived in the area all their lives. They tell you that a recent mudslide has revealed the entrance to what appears to be an ancient dungeon that previously was buried deep beneath the earth. It is located just a few miles away.";
            break;
        case 4:
            encounter = "You meet a local druid who is out for a stroll. If they deem you friendly to nature and its inhabitants they will tell you of a shortcut nearby that will allow you to travel an extra hex today.";
            break;
        case 5:
            encounter = "You meet a mage traveling alone on their mule. They say there will be a cosmic event soon that only happens once during a lifetime and they are traveling to witness it.";
            break;
        case 6:
            encounter = "You meet a band of knights riding in the opposite direction. They are traveling to a nearby city to swear fealty to the new ruler and will not be interrupted. If approached without showing the proper respect they may mistake you for a group of bandits and attack in self-defense.";
            break;
        case 7:
            encounter = "You meet a tracker. They have been hired by the local ruler to track down " + getRandomNeerDoWell() + ".";
            break;
        case 8:
            encounter = "You meet a group of pilgrims on their way to visit an ancient shrine in the mountains. They do not have much information, nor anything to offer in terms of trade. But if you show them hospitality and kindness perhaps you will earn the favor of the gods?";
            break;
        case 9:
            encounter = "A caravan of merchants are traveling in the same direction as you for 1d6 hexes. They ask if you want to escort them for the remainder of the journey. (Or at least for as long as you will travel alongside them, if your journey is shorter.) In exchange they offer 10 gold per day as well as food for the journey. You may also browse their wares.";
            break;
        case 10:
            encounter = "Tracks lead of into the distance. It appears " + getRandomNeerDoWell() + " have recently traveled trough this area. Their tracks lead to a hidden dungeon.";
            break;
        case 11:
            encounter = "You meet a party of adventurers who are traveling the opposite direction. They will gladly exchange rumors or trade gear.";
            break;
        case 12:
            encounter = "A group of armed dwarves are traveling to the mountains. They are on a mission from their homeland to reclaim a dungeon that was lost to them centuries ago.";
            break;
        case 13:
            encounter = "A group of armed elves are traveling to the forest. They are on a mission from their homeland to reclaim a dungeon that was lost to them centuries ago.";
            break;
        case 14:
            encounter = "A sudden rainstorm rolls in unexpectedly as you seek shelter from the storm you discover the entrance to a dungeon hidden in a cave.";
            break;
        case 15:
            encounter = "An intense storm rolls in over the land. Harsh winds and heavy rain makes travel difficult. You should probably seek shelter because even if you press on you will be slowed down so much that you wont make much progress. This hex takes a full day to clear, even on horseback.";
            break;
        case 16:
            encounter = "Further ahead you see " + getRandomNeerDoWell() + " hiding in an ambush... but they are facing the other way and have not noticed you yet! They are waiting for a caravan of merchants that you can see further ahead who are coming this way.";
            break;
        case 17:
            encounter = "A group of adventurers are fighting against " + getRandomNeerDoWell() + ". If you join the fight they will be thankful for the aid but be reluctant to share the spoils. This was a bounty that they have been tracking for days and a nice reward of 2000 gold is awaiting them in a nearby city. (If the players allow the other adventurers to collect the bounty themselves they will receive a message delivered by courier in 1d12 days. It is a thank you from the other adventurers and 1000 gold)";
            break;
        case 18:
            encounter = "You unexpectedly fin a path that cuts trough the land cutting a lot of time off your travel. You will be able to cover one extra hex today! (Only one, regardless of mode of transport.)";
            break;
        case 19:
            encounter = "You see smoke and hear the sound of battle nearby. If you approach you will find a group of traveling merchants being attacked by " + getRandomNeerDoWell() + ". The security they hired has already been defeated and their carriage is on fire. If rescued they will reward you with 1d6 * 100 gold. (Double that if you manage to put out the fire withing 1d6 turns)";
            break;
        default:
            encounter = "You suddenly notice that a mysterious old wizard is walking alongside you. When you ask him who he is or what he wants he will first try to gaslight you into believing he has always been a part of your party. If you insist he will finally yield and confess that he is just messing around. He is a powerful high level wizard but he is absolutely unhelpful. He will not aid in fights or assist you in any way beyond shouting words of encouragement. After a day or two he will disappear just as abruptly as he appeared when nobody is watching.";
            break;
    }

    return "<b><span style='color: yellow;'>AN EVENT! </span></b>: <i>" + encounter + "</i>";
}

function getRandomEncounter() {
    var encounter = "";

    switch(Math.ceil(Math.random() * 20)) {
        case 1:
            encounter = Math.ceil(Math.random() * 10) + " kobolds";
            break;
        case 2:
            encounter = Math.ceil(Math.random() * 10) + " goblins";
            break;
        case 3:
            encounter = Math.ceil(Math.random() * 10) + " bandits";
            break;
        case 4:
            encounter = Math.ceil(Math.random() * 6) + " wolves";
            break;
        case 5:
            encounter = Math.ceil(Math.random() * 8) + " orc raiders";
            break;
        case 6:
            encounter = Math.ceil(Math.random() * 8) + " gnolls";
            break;
        case 7:
            encounter = "a brown bear";
            break;
        case 8:
            encounter = "an ogre";
            break;
        case 9:
            encounter = "a cyclops";
            break;
        case 10:
            encounter = "a hobgoblin and their " + Math.ceil(Math.random() * 4) + " goblin minions";
            break;
        case 11:
            encounter = Math.ceil(Math.random() * 6) + " fanatical cultists looking for a sacrifice to their demon lord.";
            break;
        case 12:
            encounter = Math.ceil(Math.random() * 8) + " harpies";
            break;
        case 13:
            encounter = "a hag";
            break;
        case 14:
            encounter = "a giant";
            break;
        case 15:
            encounter = "a single orc, heavily armored and mad with rage";
            break;
        case 16:
            encounter = Math.ceil(Math.random() * 10) + " skeletons who emerge from a nearby hidden dungeon";
            break;
        case 17:
            encounter = "a troll";
            break;
        case 18:
            encounter = "a thief";
            break;
        case 19:
            encounter = "a traveler who turns out to be a devil in disguise";
            break;
        default:
            encounter = "A DRAGON!";
            break;
    }

    return "<b><span style='color: red;'>AN ENCOUNTER! </span></b>: " + encounter;
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
    questIndex = Math.ceil(Math.random() * 20);
    return getQuestTask(questIndex);
}

function getQuestTask(number) {
    var questTaskTable = {
        1: "slay/route out " + neerDoWell,
        2: "recover an artifact stolen by bandits",
        3: "escort a scholar to the inner sanctum of a dungeon where they must translate a fresco",
        4: "defeat " +neerDoWell+" who moved into nearby dungeon.",
        5: "stop " +neerDoWell+" from achieving their goal",
        6: "find their ancient family signet ring in a nearby dungeon, that will prove their nobility",
        7: "find an ancient library of lost lore in a nearby dungeon",
        8: "find proof that " +neerDoWell+" is innocent and misunderstood",
        9: "find proof that " +neerDoWell+" was behind a recent murder",
        10: "rescue (or at least recover the remains of) an adventurer who got lost in a dungeon",
        11: "clear out all threats in a nearby dungeon so it can be repurposed for good",
        12: "rescue their family member from " +neerDoWell+"",
        13: "escort a valuable transport carrying an artifact trough dangerous lands.",
        14: "find a scroll in a nearby dungeon. But under no circumstances must you read it!",
        15: "find an artifact that was lost as it was being transported here",
        16: "defeat " +neerDoWell+" and find out what they are up to",
        17: "stop " +neerDoWell+" from macing a deal with a devil",
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
    return getNeerDoWell(Math.ceil(Math.random() * 20));
}

function getNeerDoWell(number) {
    const neerDoWellTable = {
        1: "a group of kobolds",
        2: "a group of goblins",
        3: "a group of ogres",
        4: "a group of bandits/highwaymen/pirates",
        5: "the ghost of a evil ruler from the regions dark past",
        6: "a vampire who was awoken from their slumber when adventurers disturbed their tomb",
        7: "a Medusa",
        8: "a werewolf",
        9: "a band of orc raiders",
        10: "a group of lizardmen who recently came to the area from elsewhere",
        11: "a hag who has lived nearby for centuries, but only recently started to terrorize the locals.",
        12: "a demon who has possessed a local",
        13: "a group of deserters turned bandits, lead by their former captain",
        14: "an ancient witch",
        15: "a crime-lord who wants to expand their territory into the local area",
        16: "a death cult who believes the world will end and only a powerful demon can save them",
        17: "a mad mage, turned insane from studying forbidden knowledge",
        18: "a necromancer with their hoard of undead",
        19: "a secret cabal of vampires",
        20: "A DRAGON"
    };
    return neerDoWellTable[number] || "Invalid number. Please enter a number between 1 and 20.";
}


function getRandomHex(wilderness) {
    if (wilderness) {
        return getHex(Math.ceil(Math.random() * 16));
    } else {
        return getHex(Math.ceil(Math.random() * 20));
    }
}

function getHex(number) {
    const hexTable = {
        1: "The same terrain as the previous tile <i>(if previous tile was a large settlement like a city or capital you should instead use the terrain of the surrounding area)</i>",
        2: "The same terrain as the previous tile <i>(if previous tile was a large settlement like a city or capital you should instead use the terrain of the surrounding area)</i>",
        3: "The same terrain as the previous tile <i>(if previous tile was a large settlement like a city or capital you should instead use the terrain of the surrounding area)</i>",
        4: "The same terrain as the previous tile <i>(if previous tile was a large settlement like a city or capital you should instead use the terrain of the surrounding area)</i>",
        5: "The same terrain as the previous tile <i>(if previous tile was a large settlement like a city or capital you should instead use the terrain of the surrounding area)</i>",
        6: "The same terrain as the previous tile <i>(if previous tile was a large settlement like a city or capital you should instead use the terrain of the surrounding area)</i>",
        7: "Plains ",
        8: "Plains ",
        9: "Hills",
        10: "Hills",
        11: "Forest",
        12: "Forest",
        13: "Mountains",
        14: "Mountains",
        15: "Wasteland",
        16: "Bog",
        17: "A Town",
        18: "A Town",
        19: "A large city",
        20: "A capital (A large city have a capital... or draw a border between two regions?)"
    };
    return hexTable[number] || "Invalid number. Please enter a number between 1 and 20.";
}

