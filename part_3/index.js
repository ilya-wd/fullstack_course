require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
// morgan('tiny');
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());

app.use(express.json());
app.use(express.static('build'));
// app.use(morgan('tiny'));

morgan.token('body', (request) => JSON.stringify(request.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  let currentDate = new Date();
  Person.count().then((count) =>
    response.send(
      `<p>Phonebook has info for ${count} people</p><p>${currentDate}</p>`
    )
  );
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .catch((error) => next(error))
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const generateId = () => {
  const randomId = Math.floor(Math.random() * 10000000000);
  return randomId;
};

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'number or name is missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  // console.log(person);
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
