const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const characterSchema = new Schema({
  name: { type: String, required: true },
  rankId: { type: ObjectId },
  createdBy: { type: String, required: true }
}, { timestamps: true });

characterSchema.virtual('characterId').get(function() {
    return this._id;
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
