const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rankSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  health: [{
      score: { type: Number, required: true },
      skill: { type: String, required: true }
  }],
  strength: [{
      amount: { type: Number, required: true },
      dice: { type: Number, required: true },
      skill: { type:  String, required: true }
  }],
  armor: [{
      score: { type: Number, required: true },
      skill: { type: String, required: true }
  }],
  agility: [{
      score: { type: Number, required: true },
      skill: { type: String, required: true }
  }],
  stamina: [{
      score: { type: Number, required: true },
      skill: { type: String, required: true }
  }],
  magicka: [{
      score: { type: Number, required: true },
      skill: { type: String, required: true }
  }],
  bravery: [{
      score: { type: Number, required: true },
      skill: { type: String, required: true }
  }],
  leadership: [{
      score: { type: String, required: true },
      skill: { type: String, required: true }
  }],
  charisma: [{
      score: { type: Number, required: true },
      skill: { type: String, required: true }
  }],
  accuracy: [{
      los: { type: Number, required: true },
      aim: { type: Number, required: true },
      skill: { type: String, required: true }
  }]
});

rankSchema.virtual('rankId').get(function() {
    return this._id;
});

const Rank = mongoose.model('Rank', rankSchema);

module.exports = Rank;
