function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
  }

  function generateQuest() {
    var questGiver = "The void";
    var task = "do nothing"
    var reason = "for no reason."
    // The Who
    switch(rollD20()) {
      case 1:
        questGiver = "A disembodied voice ";
        break;
      case 2:
        questGiver = "An old friend ";
        break;
      case 3:
        questGiver = "A lover from your past ";
        break;
      case 4:
        questGiver = "An old friend of the family ";
        break;
      case 5:
        questGiver = "The town drunk ";
        break;
      case 6:
        questGiver = "A new love-interest ";
        break;
      case 7:
        questGiver = "A local wizard ";
        break;
      case 8:
        questGiver = "A local cleric ";
        break;
      case 9:
        questGiver = "A noble ";
        break;
      case 10:
        questGiver = "The town elder ";
        break;
      case 11:
        questGiver = "The innkeeper ";
        break;
      case 12:
        questGiver = "A worried parent ";
        break;
      case 13:
        questGiver = "The blacksmith ";
        break;
      case 14:
        questGiver = "All of the townspeople ";
        break;
      case 15:
        questGiver = "A wealthy shopkeeper ";
        break;
      case 16:
        questGiver = "A struggling shopkeeper ";
        break;
      case 17:
        questGiver = "The leader of the town guard ";
        break;
      case 18:
        questGiver = "A local guild master ";
        break;
      case 19:
        questGiver = "A mysterious stranger/benefactor ";
        break;
      case 20:
        questGiver = "A divine spirit ";
        break;
      default:
        questGiver = "The void ";
        break;
    }

    // The What
    switch(rollD20()) {
      case 1:
        task = "SLAY A DRAGON ";
        break;
      case 2:
        task = "performe a stupid fetch-quest ";
        break;
      case 3:
        task = "get rid of a roadblock ";
        break;
      case 4:
        task = "find their friend, who went missing in a nearby dungeon ";
        break;
      case 5:
        task = "destroy a nearby monster nest ";
        break;
      case 6:
        task = "rescue their family member ";
        break;
      case 7:
        task = "escort an important person trough dangerous lands ";
        break;
      case 8:
        task = "slay a monster that lurks nearby ";
        break;
      case 9:
        task = "solve a murder ";
        break;
      case 10:
        task = "expore some nearby ruins ";
        break;
      case 11:
        task = "teach some local thugs a lesson ";
        break;
      case 12:
        task = "steal something that is rightfully theirs ";
        break;
      case 13:
        task = "find a lost artifact ";
        break;
      case 14:
        task = "destroy a magic artifact ";
        break;
      case 15:
        task = "stop a dark ritual that will happen next full moon ";
        break;
      case 16:
        task = "capture a bandit leader alive ";
        break;
      case 17:
        task = "free an innocent from captivity ";
        break;
      case 18:
        task = "aid in a diplomatic mission ";
        break;
      case 19:
        task = "aid them in a coup ";
        break;
      case 20:
        task = "CHALLENGE A GOD ";
        break;
      default:
        task = "do nothing ";
        break;
    }

    // The Why
    switch(rollD20()) {
      case 1:
        reason = "cuz fuck em, that's why!";
        break;
      case 2:
        reason = "so that they can proove their innocence.";
        break;
      case 3:
        reason = "so that they can achieve their life goal.";
        break;
      case 4:
        reason = "because they saw it in a vision.";
        break;
      case 5:
        reason = "to piss of their rival.";
        break;
      case 6:
        reason = "to further their secret agenda.";
        break;
      case 7:
        reason = "to clear their family name.";
        break;
      case 8:
        reason = "to regain their honor.";
        break;
      case 9:
        reason = "because they made a promise.";
        break;
      case 10:
        reason = "to test your might.";
        break;
      case 11:
        reason = "to prove the townsfolk wrong.";
        break;
      case 12:
        reason = "for justice.";
        break;
      case 13:
        reason = "because they believe it is the right thing to do.";
        break;
      case 14:
        reason = "to gain knowledge and power.";
        break;
      case 15:
        reason = "for a large profit.";
        break;
      case 16:
        reason = "to avenge their loved one.";
        break;
      case 17:
        reason = "out of revenge.";
        break;
      case 18:
        reason = "for the good of the realm!";
        break;
      case 19:
        reason = "so that they can die in peace.";
        break;
      case 20:
        reason = "FOR GLORY!";
        break;
      default:
        reason = "for no reason.";
        break;
    }

    document.getElementById("quest").innerHTML = questGiver + "wants to hire you to " + task + "- " + reason;
  }