const mongoose = require('mongoose');

const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const characterSchema = new Schema({
  name: { type: String, required: true },
  rankId: { type: ObjectId },
  createdBy: { type: ObjectId, required: true },
  caracteristics: [{
    category: { type: String, required: true },
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
  }]
}, { timestamps: true });

characterSchema.path('caracteristics').validate(function(features){
    if(!features){return false}
    else if(features.length === 0){return false}
    return true;
}, 'Character needs to have caracteristics');

characterSchema.virtual('characterId').get(function() {
    return this._id;
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
