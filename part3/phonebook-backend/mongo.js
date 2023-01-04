
const mongoose = require('mongoose')

if (process.argv.length < 4) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[3]

const url = `mongodb+srv://Jari:${password}@phoneapp.rfzxi5k.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    id: Int16Array,
    name: String,
    number: Int16Array,
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })

    return person.save() 
    })
    .then(() => {
        console.log('Person saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err)) 