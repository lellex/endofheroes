'use strict';

const Rank = require('../models/Rank');

exports.getRanks = (req, res) => {
  Rank.find({}, function(err, ranks) {
    res.render('rank/index', {
      title: 'Ranks list',
      ranks: ranks
    });
  });
};

exports.newRank = (req, res) => {
  res.render('rank/new', {
    title: 'New rank'
  });
};

exports.postRank = (req, res, next) => {
  const r = req.body;
  const rank = new Rank({
    name: r.name,
    category: r.category,
    description: r.description,
    health: [{
      score: r.health,
      skill: r.skill_health
    }],
    strength: [{
      amount: r.strength_amount,
      dice: r.strength_dice,
      skill: r.skill_strength
    }],
    armor: [{
      score: r.armor,
      skill: r.skill_armor
    }],
    agility: [{
      score: r.agility,
      skill: r.skill_agility
    }],
    stamina: [{
      score: r.stamina,
      skill: r.skill_stamina
    }],
    magicka: [{
      score: r.magicka,
      skill: r.skill_magicka
    }],
    bravery: [{
      score: r.bravery,
      skill: r.skill_bravery
    }],
    leadership: [{
      score: r.leadership,
      skill: r.skill_leadership
    }],
    charisma: [{
      score: r.charisma,
      skill: r.skill_charisma
    }],
    accuracy: [{
      los: r.accuracy_los,
      aim: r.accuracy_aim,
      skill: r.skill_accuracy
    }]
  });

  rank.save((err) => {
    console.log(err);
    if (err) { return next(err); }
    res.redirect('/rank');
  });
};

exports.deleteRank = (req, res, next) => {
  console.log('delete');
  Rank.remove({ _id: req.params.id }, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/rank');
  });
};
