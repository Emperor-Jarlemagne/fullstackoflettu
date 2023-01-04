

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Persons')
require('dotenv').config()

const requestLogger = (request, response, next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    console.log('---')
    next()
}

 /* let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
] */

app.use(express.json())

app.use(requestLogger)

app.use(express.static('build'))

morgan.token('body', (request) => { 
    return JSON.stringify(request.body) 
})

app.use(morgan(
    ':method :url :body :status :res[content-length] - :response-time ms'
))

app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response) => {
    response.send(
        `<h1>Phonebook has info for ${persons.length} people</h1></br><p>${new Date()}</p>`
    )
})


const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }
    if(body.name && body.number === person) {
        return response.status(400).json({
            error: 'name or number already exists'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
        //important: body.important || false,
    }
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)
    response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error : 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})