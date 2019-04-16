const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongoose_delete = require('mongoose-delete')

const TodoSchema = new Schema({
    task: String
})

//TodoSchema.plugin(mongoose_delete)

// Override all methods
TodoSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
// or 
// TodoSchema.plugin(mongoose_delete, { overrideMethods: true });

// Overide only specific methods
// TodoSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });
// or
// TodoSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'countDocuments', 'find'] });
// or (unrecognized method names will be ignored)
// TodoSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'errorXyz'] });

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo