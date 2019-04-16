const mongoose = require('mongoose')
const faker = require('faker')

const Todo = require('./Todo')

mongoose.connect('mongodb://localhost:27017/soft')

const addAndRemove = async () => {
  const todo = new Todo({ task: faker.fake('{{lorem.sentence}}') })

  await todo.save()
  // mongodb: { deleted: false, name: 'todo' }

  // note: you should invoke exactly delete() method instead of standard todo.remove()
  await todo.delete()
  // mongodb: { deleted: true, name: 'todo' }

  await todo.restore()
  // mongodb: { deleted: false, name: 'todo' }
}

const addOneTodo = async () => {
  const todo = new Todo({ task: faker.fake('{{lorem.sentence}}') })

  await todo.save()
  const documents = await Todo.find()
  // will return only NOT DELETED documents
  console.log(documents)
}

const findTodo = async () => {
  const documents = await Todo.find()
  // will return only NOT DELETED documents
  console.log(`Busca com find():`)
  console.log(documents)

  const documentsDeleted = await Todo.findDeleted()
  // will return only DELETED documents
  console.log(`Busca com findDeleted():`)
  console.log(documentsDeleted)

  const documentsWithDeleted = await Todo.findWithDeleted()
  // will return ALL documents
  console.log(`Busca com findWithDeleted():`)
  console.log(documentsWithDeleted)
}

const removeTodoDeleted = async () => {
  const documents = await Todo.findDeleted()
  const todo = documents[0]
  if (todo) {
    const results = await todo.restore()
    console.log(results)
  }
}

const removeTodo = async () => {
  const documents = await Todo.find()
  const todo = documents[0]
  if (todo) {
    const results = await todo.delete()
    console.log(results)
  }
}

const counting = async () => {
  const items = await Todo.find({}).count()
  console.log(`Counting: ${items}`)
}

const execution = async () => {
  await mongoose.connection.dropDatabase()
  await addAndRemove()
  await addOneTodo()
  await addOneTodo()
  await addOneTodo()
  await removeTodo()
  await findTodo()
  await counting()
}

execution()
