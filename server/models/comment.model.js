const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post"
  },
  user: String,
  comment: String
}, {
  timestamps: true
})

let comment = mongoose.model('Comment', commentSchema)

module.exports = comment
