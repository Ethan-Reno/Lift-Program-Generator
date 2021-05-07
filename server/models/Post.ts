const mongoose = require('mongoose');

// Schema - how the post looks
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Posts', PostSchema);
