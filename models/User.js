const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  outlookId: String
});

mongoose.model('users', userSchema);