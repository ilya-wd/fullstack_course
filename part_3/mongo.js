const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://filthystack:${password}@cluster0.tgbqmon.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const peopleSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: Number,
});

const Person = mongoose.model('Person', peopleSchema);

// let name, number;

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: Math.floor(Math.random() * 1000000),
  });

  person.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, ' ', person.number);
    });
    mongoose.connection.close();
  });
}
