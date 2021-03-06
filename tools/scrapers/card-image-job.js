var allSets = require('./AllSets.json');

var lookup = {
  "Dragons of Tarkir" : "DTK",
  "Fate Reforged" : "FRF",
  "Khans of Tarkir" : "KTK",
  "Journey Into Nyx" : "JOU",
  "Born of the Gods" : "BNG",
  "Theros" : "THS",
  "Dragon's maze" : "DGM",
  "Gatecrash" : "GTC",
  "Return to Ravnica" : "RTR",
  "Avacyn Restored" : "AVR",
  "Dark Ascension" : "DKA",
  "Innistrad" : "INN",
  "New Phyrexia" : "NPH",
  "Mirrodin Besieged" : "MBS",
  "Scars of Mirrodin" : "SOM",
  "Rise of the Eldrazi" : "ROE",
  "Worldwake" : "WWK",
  "Zendikar" : "ZEN",
  "Alara Reborn" : "ARB",
  "Conflux" : "CON",
  "Shards of Alara" : "ALA",
  "Eventide" : "EVE",
  "Shadowmoor" : "SHM",
  "Morningtide" : "MOR",
  "Lorwyn" : "LRW",
  "Future Sight" : "FUT",
  "Planar Chaos" : "PLC",
  "Time Spiral" : "TSP",
  "Timeshifted" : "TSB",
  "Coldsnap" : "CSP",
  "Dissension" : "DIS",
  "Guildpact" : "GPT",
  "Ravnica" : "RAV",
  "Saviors of Kamigawa" : "SOK",
  "Betrayers of Kamigawa" : "BOK",
  "Champions of Kamigawa" : "CHK",
  "Fifth Dawn" : "5DN",
  "Darksteel" : "DST",
  "Mirrodin" : "MRD",
  "Scourge" : "SCG",
  "Legions" : "LGN",
  "Onslaught" : "ONS",
  "Judgent" : "JUD",
  "Torment" : "TOR",
  "Odyssey" : "ODY",
  "Apocalyps" : "APC",
  "Planeshift" : "PLS",
  "Invasion" : "INV",
  "Prophecy" : "PCY",
  "Nemesis" : "NMS",
  "Mercadian Masques" : "MMQ",
  "Urza's Destiny" : "UDS",
  "Urza's Legacy" : "ULG",
  "Urza's Saga" : "USG",
  "Exodus" : "EXO",
  "Stronghold" : "STH",
  "Weatherlight" : "WTH",
  "Tempest" : "TMP",
  "Visions" : "VIS",
  "Mirage" : "MIR",
  "Alliances" : "ALL",
  "Homelands" : "HML",
  "Ice Age" : "ICE",
  "Fallen Empires" : "FEM",
  "The Dark" : "DRK",
  "Legends" : "LEG",
  "Antiquities" : "ATQ",
  "Arabian Nights" : "ARN",
  "Magic 2015 (M15)" : "M15",
  "Magic 2014 (M14)" : "M14",
  "Magic 2013 (M13)" : "M13",
  "Magic 2012 (M12)" : "M12",
  "Magic 2011 (M11)" : "M11",
  "Magic 2010 (M10)" : "M10",
  "Tenth Edition" : "10E",
  "Ninth Edition" : "9ED",
  "Eighth Edition" : "8ED",
  "Seventh Edition" : "7ED",
  "Sixth Edition" : "6ED",
  "Fifth Edition" : "5ED",
  "Fourth Edition" : "4ED",
  "Revised Edition" : "3ED",
  "Unlimited Edition" : "2ED",
  "Beta Edition" : "LEB",
  "Alpha Edition" : "LEA",
  "From the Vault: Exiled" : "V09"
};

module.exports = function(card, callback) {
  var setName = card.name,
    cardName = card.set;
  var setCode = lookup[setName];
  if(!setCode){
    callback(null, 0);
  } else {
    var matches = allSets[setCode].cards.filter(function (card) {
      return cardName === card.name
    });

    var match = matches[0];

    if(match && match.hasOwnProperty('miltiverseid'))
      callback(null, match.hasOwnProperty());
  }
};



