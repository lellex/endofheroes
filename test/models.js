const chai = require('chai');
const expect = chai.expect;
const User = require('../models/User');
const Character = require('../models/Character');
const Rank = require('../models/Rank');

describe('User Model', () => {
  it('should create a new user', (done) => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save((err) => {
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

  it('should find user by email', (done) => {
    User.findOne({ email: 'test@gmail.com' }, (err, user) => {
      expect(err).to.be.null;
      expect(user.email).to.equal('test@gmail.com');
      done();
    });
  });

  it('should delete a user', (done) => {
    User.remove({ email: 'test@gmail.com' }, (err) => {
      expect(err).to.be.null;
      done();
    });
  });
});

describe('Character Model', () => {
  it('should not create a new character without author', (done) => {
    const character = new Character({
      name: 'Bodla'
    });

    character.save((err) => {
      expect(err.name).to.equal('ValidationError');
      done();
    });
  });

  it('should create a new character', (done) => {
    const bodla = new User({
      email: 'bodla@gmail.com',
      password: 'password'
    });

    const character = new Character({
      name: 'Bodla',
      createdBy: bodla.email
    });

    character.save((err) => {
      console.log(err);
      expect(err).to.be.null;
      done();
    });
  });
});

describe('Rank Model', () => {
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

    rank.save((err) => {
      console.log(err);
      expect(err).to.be.null;
      done();
    });
  });

  it('should delete a rank', (done) => {
    User.remove({ name: 'Rank For Test' }, (err) => {
      expect(err).to.be.null;
      done();
    });
  });
});
