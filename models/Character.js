const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const characterSchema = new Schema({
  name: String,

});

characterSchema.virtual('categoryId').get(function() {
    return this._id;
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
