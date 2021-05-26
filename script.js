
var days2travel = 0;


// lowest is 0, highest is 19                                                  
function rollD20() {
    return Math.floor(Math.random() * 20);
}

function testDice() {
  var rolls = 1000000;
  console.log("Rolling the die " + rolls + " times.")
  var resultList = new Array(); 
  for (var i = 0; i < rolls; i++) {
    var r = rollD20();
    if(resultList[r] == null) {
      resultList[r] = new Array(); 
    }
    resultList[r].push(r);
  }
  console.log("Results: ")
  for (var j = 0; j < resultList.length; j++) {
    console.log(resultList[j][0] + ": " + resultList[j].length);
  }
}

//  ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗███████╗     ██████╗ ██╗   ██╗███████╗███████╗████████╗
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   █████╗      ██║   ██║██║   ██║█████╗  ███████╗   ██║   
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██╔══╝      ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ███████╗    ╚██████╔╝╚██████╔╝███████╗███████║   ██║   
//  ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝     ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   
function generateQuest() {

  // The Who
  var questGiverList = [
    "A disembodied voice ",
    "An old friend ",
    "A lover from your past ",
    "An old friend of the family ",
    "The town drunk ",
    "A new love-interest ",
    "A local wizard ",
    "A local cleric ",
    "A noble ",
    "The town elder ",
    "The innkeeper ",
    "A worried parent ",
    "The blacksmith ",
    "All of the townspeople ",
    "A wealthy shopkeeper ",
    "A struggling shopkeeper ",
    "The leader of the town guard ",
    "A local guild master ",
    "A mysterious stranger/benefactor ",
    "A divine spirit "
  ];

  // The What
  var questList = [
    "SLAY A DRAGON ",
    "performe a stupid fetch-quest ",
    "get rid of a roadblock ",
    "find their friend, who went missing in a nearby dungeon ",
    "destroy a nearby monster nest ",
    "rescue their family member ",
    "escort an important person trough dangerous lands ",
    "slay a monster that lurks nearby ",
    "solve a murder ",
    "expore some nearby ruins ",
    "teach some local thugs a lesson ",
    "steal something that is rightfully theirs ",
    "find a lost artifact ",
    "destroy a magic artifact ",
    "stop a dark ritual that will happen next full moon ",
    "capture a bandit leader alive ",
    "free an innocent from captivity ",
    "aid in a diplomatic mission ",
    "aid them in a coup ",
    "CHALLENGE A GOD "
  ];

  // The Why
  var questMotiveList = [
    "cuz fuck you, that's why!",
    "so that they can proove their innocence.",
    "so that they can achieve their life goal.",
    "because they saw it in a vision.",
    "to piss of their rival.",
    "to further their secret agenda.",
    "to clear their family name.",
    "to regain their honor.",
    "because they made a promise.",
    "to test your might.",
    "to prove the townsfolk wrong.",
    "for justice.",
    "because they believe it is the right thing to do.",
    "to gain knowledge and power.",
    "for a large profit.",
    "to avenge their loved one.",
    "out of revenge.",
    "for the good of the realm!",
    "so that they can die in peace.",
    "FOR GLORY!"
  ];

  document.getElementById("quest").innerHTML = questGiverList[rollD20()] + "wants to hire you to " + questList[rollD20()] + "- " + questMotiveList[rollD20()];
}

//  ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗███████╗    ███████╗███╗   ██╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗███████╗██████╗ 
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ██╔════╝████╗  ██║██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   █████╗      █████╗  ██╔██╗ ██║██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██╔══╝      ██╔══╝  ██║╚██╗██║██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ███████╗    ███████╗██║ ╚████║╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   ███████╗██║  ██║
//  ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
function generateEncounter() {
  generateHostileEncounter();
}

function generateHostileEncounter() {

  // The setup
  var setupList = [
    "The birds go silent.",
    "A paniced local comes running towards you!",
    "You hear a fight nearby.",
    "The road is blocked.",
    "You meet an adventurer who asks for your aid.",
    "The ground shakes.",
    "You find the scene of a recent crime.",
    "A corpse lie in your path.",
    "You see tracks before you.",
    "You see smoke nearby.",
    "A trapped local calls out for help!",
    "You come across a trail of blood.",
    "You hear a scream nearby.",
    "A group of locals approach you with torches and pitchfork.",
    "A traveling mechant asks for your aid.",
    "You find a dead adventurer.",
    "You see an ambush before they see you.",
    "There is a trap in your path.",
    "You are caught completely by surprise.",
    "BOOM MOTHERFUCKER!!!"
  ];

  // The monster
  var monsterList = [
    "<a href='https://www.dndbeyond.com/monsters/berserker' target='_blank'>a crazed hobo</a>",
    "<a href='https://www.dndbeyond.com/monsters/goblin' target='_blank'>a group of goblins</a>",
    "<a href='https://www.dndbeyond.com/monsters/kobold' target='_blank'>kobolds</a>",
    "<a href='https://www.dndbeyond.com/monsters/dire-wolf' target='_blank'>a pack of dire wolves</a>",
    "<a href='https://www.dndbeyond.com/monsters/brown-bear' target='_blank'>a bear</a>",
    "<a href='https://www.dndbeyond.com/monsters/bandit' target='_blank'>a group of bandits</a>",
    "<a href='https://www.dndbeyond.com/monsters/owlbear' target='_blank'>an owlbear</a>",
    "<a href='https://www.dndbeyond.com/monsters/bugbear' target='_blank'>a bugbear</a>",
    "<a href='https://www.dndbeyond.com/monsters/orc' target='_blank'>a band of orcs</a>",
    "<a href='https://www.dndbeyond.com/monsters/minotaur' target='_blank'>a minotaur</a>",
    "<a href='https://www.dndbeyond.com/monsters/berserker' target='_blank'>an illusion</a>",
    "<a href='https://www.dndbeyond.com/monsters/giant-spider' target='_blank'>a giant spider</a>",
    "<a href='https://www.dndbeyond.com/monsters/werewolf' target='_blank'>a werewolf</a>",
    "<a href='https://www.dndbeyond.com/monsters/mimic' target='_blank'>a mimic</a>",
    "<a href='https://www.dndbeyond.com/monsters/harpy' target='_blank'>a flock of harpies</a>",
    "<a href='https://www.dndbeyond.com/monsters/ghoul' target='_blank'>the undead</a>",
    "<a href='https://www.dndbeyond.com/monsters/mage' target='_blank'>a crazed wizard</a>",
    "<a href='https://www.dndbeyond.com/monsters/ogre' target='_blank'>an ogre</a>",
    "<a href='https://www.dndbeyond.com/monsters/giant-constrictor-snake' target='_blank'>a giant snake</a>",
    "<a href='https://www.dndbeyond.com/monsters/red-dragon-wyrmling' target='_blank'>A DRAGON</a>"
  ];

  // The reward
  var rewardList = [
    "... wait, you somehow lost money?",
    "20 gold!",
    "a nice weapon.",
    "5 gold.",
    "10 gold.",
    "a treasure map!",
    "an unidentified magic scroll.",
    "a nice suit of armor or shield.",
    "a healing potion.",
    "the favor of the locals.",
    "being praised as a local hero!",
    "inspiration!",
    "a bag of gemstones!",
    "free lodging.",
    "free food and supplies for a week.",
    "a mysterious tome!",
    "a stone tablet with strange symbols",
    "a signet ring of a local noble family.",
    "a common magic item.",
    "THE FAVOR OF THE GODS!"
  ];

  document.getElementById("encounter").innerHTML = setupList[rollD20()] + " And before you know it, you have to fight " + monsterList[rollD20()] + ", and your reward shall be " + rewardList[rollD20()];
}

function generateFriendlyEncounter() {

  // The setup
  var setupList = [
    "The birds go silent.",
    "A paniced local comes running towards you!",
    "You hear a fight nearby.",
    "The road is blocked.",
    "You are ambushed!",
    "The ground shakes.",
    "You find the scene of a recent crime.",
    "A corpse lie in your path.",
    "You see tracks before you.",
    "You see smoke nearby.",
    "A trapped local calls out for help!",
    "You come across a trail of blood.",
    "You hear a terrified scream nearby.",
    "You hear an angry roar nearby.",
    "You hear a crazed wail.",
    "You find a dead adventurer.",
    "You see an ambush before they see you.",
    "There is a trap in your path.",
    "You are caught completely by surprise.",
    "BOOM MOTHERFUCKER!!!"
  ];

  // The monster
  var monsterList = [
    "a crazed hobo",
    "a group of goblins",
    "kobolds",
    "a pack of wolves",
    "a bear",
    "a group of bandits",
    "a hag",
    "a bugbear",
    "a band of orcs",
    "NOTHING",
    "an illusion",
    "a giant spider",
    "a beast, like nothing you have ever seen before",
    "a mimic",
    "an ooze or gelatinous cube",
    "the undead",
    "a crazed wizard",
    "an easily fooled ogre",
    "a giant snake",
    "A DRAGON"
  ];

  // The reward
  var rewardList = [
    "( ͡° ͜ʖ ͡°)",
    "has valuable information about your quest.",
    "provides you with food and safe shelter for the night.",
    "has a common magic item for sale.",
    "gives you inspiration.",
    "sells weapons and ammunition.",
    "",
    "a nice suit of armor or shield.",
    "a healing potion.",
    "the favor of the locals.",
    "being praised as a local hero!",
    "inspiration!",
    "a bag of gemstones!",
    "free lodging.",
    "free food and supplies for a week.",
    "a mysterious tome!",
    "a stone tablet with strange symbols",
    "a signet ring of a local noble family.",
    "a common magic item.",
    "THE FAVOR OF THE GODS!"
  ];

  document.getElementById("encounter").innerHTML = setupList[rollD20()] + " And you come across " + monsterList[rollD20()] + ", who " + rewardList[rollD20()];
}

//  ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗███████╗    ███╗   ██╗██████╗  ██████╗
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ████╗  ██║██╔══██╗██╔════╝
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   █████╗      ██╔██╗ ██║██████╔╝██║     
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██╔══╝      ██║╚██╗██║██╔═══╝ ██║     
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ███████╗    ██║ ╚████║██║     ╚██████╗
//  ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═══╝╚═╝      ╚═════╝
function generateNpc() {
  
  // Trait
  var traitList = [
    "thinks you are here to kill them.",
    "appears to be drunk/hungover.",
    "is NOT very intelligent.",
    "is NOT very wise.",
    "is NOT very charismatic.",
    "instantly dislikes you.",
    "instantly dislikes you a little too much.",
    "can't take any situation seriously.",
    "has not slept all night.",
    "speaks with the accent of a far-away land.",
    "has lived arround hgere their whole life.",
    "has no idea what's going on.",
    "is very intelligent.",
    "is very charismatic.",
    "is very wise.",
    "instantly likes you.",
    "instantly likes you a little too much.",
    "is very paranoid.",
    "thinks you are on to their dark secret.",
    "is a legendaty creature in disguise.",
    "is boring."
  ];

  // Physical apperance
  var adjectiveList = [
    "a skinny ",
    "a THICC ",
    "a fat ",
    "an ugly ",
    "a scarred ",
    "a very muscular ",
    "a very thin ",
    "a somewhat chubby ",
    "a common looking ",
    "a common looking ",
    "a common looking ",
    "an old ",
    "a young ",
    "an amputee ",
    "a very pale ",
    "a very tanned ",
    "a very short ",
    "a very tall ",
    "a beautiful ",
    "an unnaturally beautiful "
  ];

  // Gender - 45% chance of male, 45% female, 10% androgynous/unknown.
  var gender = "male "
  var g = rollD20();
  if (g == 0 || g == 19) {
      gender = "androgynous/unknown ";
  } else if (g > 0 && g <= 9) {
      gender = "female ";
  }

  // Race - 50% chance of human. 10% chance of dwarf. 10% chance of elf. 5% everything else.
  var raceList = [
    "<a href='https://www.fantasynamegenerators.com/dnd-gnome-names.php' target='_blank'>gnome</a> ",
    "<a href='https://www.fantasynamegenerators.com/dnd-halfling-names.php' target='_blank'>halfling</a> ",
    "<a href='https://www.fantasynamegenerators.com/dnd-elf-names.php' target='_blank'>elf</a> ",,
    "<a href='https://www.fantasynamegenerators.com/dnd-elf-names.php' target='_blank'>elf</a> ",
    "<a href='https://www.fantasynamegenerators.com/dnd-drow-names.php' target='_blank'>drow</a> ",
    "<a href='https://www.fantasynamegenerators.com/dnd-half-orc-names.php' target='_blank'>half-orc</a> ",
    "<a href='https://www.fantasynamegenerators.com/dnd-half-elf-names.php' target='_blank'>half-elf</a> ",
    "<a href='https://www.fantasynamegenerators.com/dnd-dwarf-names.php' target='_blank'>dwarf</a> ",
    "<a href='https://www.fantasynamegenerators.com/dnd-dwarf-names.php' target='_blank'>dwarf</a> ",
    "??? "
  ];

  var race = "<a href='https://www.fantasynamegenerators.com/dnd-human-names.php' target='_blank'>human</a> ";
  var r = rollD20();
  if (r < 10) {
    race = raceList[r];
  }

  document.getElementById("npc").innerHTML = "You meet " + adjectiveList[rollD20()] + gender + race + " who " + traitList[rollD20()];
}

function travel(period) {
  days2travel = period
  document.getElementById("travelLog").innerHTML = "You set out on your " + days2travel + " day journey! Click the \"Next Day!\" button to begin."
}

function generateDay() {
  if (days2travel == 0) {
    document.getElementById("travelLog").innerHTML = "<b>You arrive!</b> Your journey has finaly come to an end."
  } 
  else if (days2travel == 1){
    document.getElementById("travelLog").innerHTML = "<b>Last day of travel:</b> " + generateTravelEvent()
    days2travel--;
  } else {
    document.getElementById("travelLog").innerHTML = "<b>" +days2travel + " days left:</b> " + generateTravelEvent()
    days2travel--;
  }
}

function generateTravelEvent(){

  var t = rollD20();
  // 20% chance of random encounter.
  if (t < 6){
    return "You have a RANDOM ENCOUNTER! (use generator)"
  }
  // 20% chance of nothing happening.
  if (t > 14){
    return "Uneventfull day of travel."
  }
  // otherwise pick one from the random list.
  var travelEventList = [
    "A dog wanders into camp. It wants to eat 1 ration and cuddle (give insipration) but disturb your sleep (roll wis save or disturb long rest/mediation)",
    "There is unexpected bad weather. Make a survival DC 12 to find shelter for the night or be exhausted.",
    "A band of traveling bards are heading in the same direction for a day. They entertain you on the road and you all get inspiration.",
    "You sleep under the constellation of the mage. Magic users wake up with inspiration.",
    "You sleep under the constellation of the warior. Mele players wake up with inspiration.",
    "A small creature has set up a merchant stall in the middle of nowhere. It trades treasures it as found (in nearby ruin) for food or fun trinkets.",
    "The player taking lead makes a survival check DC " + (Math.floor(Math.random() * 10) + 10 ) +  ". On sucess find shortcut. (reroll for " + Math.max((days2travel -1), 0) + " days)",
    "The player taking lead makes a survival check DC " + (Math.floor(Math.random() * 10) + 10 ) +  ". On fail you get lost. (reroll for " + (days2travel + 2) + " days)",
    "The food you ate today has gone bad. Con save DC" + (Math.floor(Math.random() * 10) + 10 ) +  " or spend the night in agony and wake up exhausted.",
    "A god gives a vision to one of the players when they sleep. They wake up with inspiration.",
    "A god is testing one of the players when they sleep. Wis save DC " + (Math.floor(Math.random() * 10) + 10 ) +  "or wake up exhausted.",
    "The stars align and the gods smile upon you. You go to sleep and have peaceful dreams. When you wake up your exhaustion is gone.",
    "You travel trough a bountyful area. With ease you replenish your supplies with " + Math.floor(Math.random() * 6) + " days worth of rations per player.",
    "Night watch make a " + (Math.floor(Math.random() * 10) + 10 ) +  " perception check to see animals breaking into the supplice. Fail and loose" + Math.floor(Math.random() * 6) + " days worth of rations per player.",
    "Flies and insects keep disturbing you in your sleep. Con save " + (Math.floor(Math.random() * 10) + 10 ) + " or choose: only take short rest OR take long rest + a level of exhaustion.",
    "You come across a wounded animal in your travels, if  aided it will dissapear into the wilderness but make triumphant return to aid you in a future battle!",
    "A rare cosmic event will happen tonight. Players can choose to take one level of exhaustion to stay up late and witness it to get inspiration.",
    "The air here is foul and food tends to spoil here. Someone make a roll with 50/50 chance to spoil" + Math.floor(Math.random() * 4) + " days worth of rations per player.",
    "The party is mistaken for bandits by another adventuring party who are waiting in an ambush. They soon realize their misstake during combat and appologizes.",
    "A sign made of junk poins into the wilderness. It reads \"DIS WAE FOR DAT GOOD GOOD.\"",
    "An animal jumps across your path. Perception check DC " + (Math.floor(Math.random() * 10) + 10 ) + " reveals it carries a magic necklace.",
    "Your path has become ubstructed by resent bad weather. It takes 2 more days of traveling trough difficult terrain. (reroll for " + (days2travel + 1) + " days).",
    "Your knowledge of this area appears to be outdated. The journey is easier than expected! (reroll for " + Math.max((days2travel -2), 0) + " days).",
    "Your knowledge of this area appears to be outdated. The journey is harder than expected! (reroll for " + (days2travel +2) + " days).",
    "You find mushrooms! Nature check DC " + (Math.floor(Math.random() * 10) + 10 ) + " reveal they are poisonus. If eaten you loose 1 day of travel to aggony and stomach ache. (reroll for " + (days2travel + 1) + " days)",
    "The full moon makes traveling in darkness easy. You make extra progress on your journey. (reroll for " + Math.max((days2travel -1), 0) + " days) OR cover regular distance in half the time (you loose one level of exhaustion).",
    "Freak weather conditions make travel almost impossible. Hunker down for a day (reroll for " + (days2travel + 1) + " days) OR brave the condtions with a survival check DC " + (Math.floor(Math.random() * 10) + 10 ) +  "with disadvantage.",
    "A traveler lets you know of a nearby shortcut. It is not on most maps because it is dangerous. If taken it cuts down travel time (reroll for " + (days2travel + 1) + " days) BUT you will face a RANDOM ENCOUNTER.",
    "Survival check DC " + (Math.floor(Math.random() * 10) + 10 ) +  " finds large monstrous tracks. If followed they appear to... shrink over time?... And lead to a RANDOM NPC walking down the road, who is friendly and happy to see you.",
    "The trail just ends! Survival DC " + (Math.floor(Math.random() * 10) + 3 ) +  " to find it again. On fail you get lost. (reroll for " + (days2travel + 1) + " days)",
    "You think you know a shortcut nearby " + (Math.floor(Math.random() * 10) + 3 ) +  " to find it. (reroll for " + Math.max((days2travel -1), 0) + " days)",
  ];

  return travelEventList[Math.floor(Math.random() * travelEventList.length)];
}