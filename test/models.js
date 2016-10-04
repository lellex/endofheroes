const chai = require('chai');
const expect = chai.expect;
const User = require('../models/User');
const Character = require('../models/Character');
const Rank = require('../models/Rank');


describe('Models : User, Rank, Character', () => {
  var UserTestId = null;
  var RankTestId = null;
  var CharacterTestId = null;

  it('should create a new user', (done) => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save((err, user) => {
      UserTestId = user._id;
      expect(err).to.be.null;
      expect(user.email).to.equal('test@gmail.com');
      expect(user).to.have.property('createdAt');
      expect(user).to.have.property('updatedAt');
      done();
    });
  });

  it('should not create a user with the unique email', (done) => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save((err) => {
      expect(err).to.be.defined;
      expect(err.code).to.equal(11000);
      done();
    });
  });

  it('should find user by id', (done) => {
    User.findOne({ _id: UserTestId }, (err, user) => {
      expect(err).to.be.null;
      expect(user.email).to.equal('test@gmail.com');
      done();
    });
  });

  it('should create a new rank', (done) => {
    const rank = new Rank({
      name: 'Rank For Test',
      category: 'Guerriers',
      description: 'Ils ont des relations dans tout le royaume et savent se tirer seuls des situations dangereuses. Ils peuvent accéder au sortilège de Vigueur (300) et peuvent appeler l’aide d’un Compagnon (1D6 Att / 50 PV) avec le sort d’Appel (350) s’ils l’apprennent.',
      health: [{
        score: 250,
        skill: 'novice'
      }],
      strength: [{
        amount: 1,
        dice: 6,
        skill: 'novice'
      }],
      armor: [{
        score: 25,
        skill: 'novice'
      }],
      agility: [{
        score: 34,
        skill: 'novice'
      }],
      stamina: [{
        score: 4,
        skill: 'novice'
      }],
      magicka: [{
        score: 175,
        skill: 'novice'
      }],
      bravery: [{
        score: 1,
        skill: 'initie'
      }],
      leadership: [{
        score: 1,
        skill: 'initie'
      }],
      charisma: [{
        score: 10,
        skill: 'adepte'
      }],
      accuracy: [{
        los: 4,
        aim: 0,
        skill: 'novice'
      }]
    });

    rank.save((err, rank) => {
      RankTestId = rank._id;
      expect(err).to.be.null;
      done();
    });
  });

  it('should find a rank by id', (done) => {
    Rank.findOne({ _id: RankTestId }, function(err, rank) {
      expect(err).to.be.null;
      done();
    });
  });

  it('should create a new character', (done) => {
    User.findOne({ _id: UserTestId }, (err, user) => {
      Rank.findOne({ _id: RankTestId }, function(err, rank) {
        const charRank = new Rank(rank);
        charRank._id = undefined;
        charRank.description = undefined;

        const character = new Character({
          name: 'Bodla',
          createdBy: user._id,
          caracteristics: charRank
        });

        character.save((err, character) => {
          CharacterTestId = character._id;
          expect(err).to.be.null;
          done();
        });
      });
    });
  });

  it('should a character', (done) => {
    Character.remove({ _id: CharacterTestId }, (err) => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should delete a rank', (done) => {
    Rank.remove({ _id: RankTestId }, (err) => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should delete a user', (done) => {
    User.remove({ _id: UserTestId }, (err) => {
      expect(err).to.be.null;
      done();
    });
  });
});
