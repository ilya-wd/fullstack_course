const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;
// const url = `mongodb+srv://filthystack:filthystack@cluster0.tgbqmon.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
console.log('connecting to', url);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d+$/.test(v);
      },
    },
  },
  id: Number,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
