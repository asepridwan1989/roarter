const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  status: {
    type: String,
    require: [true, 'status required']
  },
  like: {
    type: Number,
    default: 0
  },
  comment: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

let post = mongoose.model('Post', postSchema)

module.exports = post
