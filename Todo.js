const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseDelete = require('mongoose-delete')

const TodoSchema = new Schema({
  task: String
})

// TodoSchema.plugin(mongooseDelete)

// Override all methods
TodoSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
// or
// TodoSchema.plugin(mongooseDelete, { overrideMethods: true })

// Overide only specific methods
// TodoSchema.plugin(mongooseDelete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] })
// or
// TodoSchema.plugin(mongooseDelete, { overrideMethods: ['count', 'countDocuments', 'find'] })
// or (unrecognized method names will be ignored)
// TodoSchema.plugin(mongooseDelete, { overrideMethods: ['count', 'find', 'errorXyz'] })

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
