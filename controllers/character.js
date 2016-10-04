const Character = require('../models/Character');
const Rank = require('../models/Rank');

/**
 * GET /create-character
 * New character page.
 */
exports.getNewCharacter = (req, res) => {
  Rank.find({}, function(err, ranks) {
    res.render('character/new', {
      title: 'Create Character',
      ranks: ranks
    });
  });
};

/**
 * GET /character
 * Character page.
 */
exports.getCharacter = (req, res) => {
  console.log(req);
  Character.findOne({ createdBy: req.user._id }, function(err, character) {
    console.log(character);
    res.render('character/character', {
      title: 'My character',
      character: character
    });
  });
};

/**
 * POST /create-character
 * Create a new character.
 */
exports.postNewCharacter = (req, res, next) => {
  Rank.findOne({ _id: req.body.rank }, function(err, rank) {
    if (err) {
      return next(err);
    }

    const charRank = new Rank(rank);
    console.log(charRank);
    charRank._id = undefined;
    charRank.description = undefined;

    const character = new Character({
      name: req.body.name,
      createdBy: req.user._id,
      rankId: rank.id,
      caracteristics: charRank
    });

    character.save((err) => {
      if (err) { return next(err); }
      res.redirect('/character');
    });
  });

};
