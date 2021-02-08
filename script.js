

                                                  
function rollD20() {
    return Math.floor(Math.random() * 20);
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
  var reward = "no reward."
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
    "gnome ",
    "halfling ",
    "elf ",
    "elf ",
    "drow ",
    "half-orc ",
    "half-elf ",
    "dwarf ",
    "dwarf ",
    "??? "
  ];

  var race = "human ";
  var r = rollD20();
  if (r < 11) {
    race = raceList[r];
  }

  document.getElementById("npc").innerHTML = "You meet " + adjectiveList[rollD20()] + gender + race + " who " + traitList[rollD20()];
}