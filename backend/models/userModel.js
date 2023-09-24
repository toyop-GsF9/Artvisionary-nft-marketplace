const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  user_id: {
    type: String,
    required: [true, "Please tell us your user_id!"],
  },
  user_type: {
    type: String,
    required: [true, "Please tell us your user_type!"],
    enum:{
      values: ["artist", "member"],
      message: "user_type is either: artist or member",
    }
  },
  profile_image: {
    type: String,
    default: 'default.jpg',
    required: [true, "Please provide your profile_image!"],
  },
  bio: {
    type: String,
    required: [true, "Please provide your bio!"],
  },
  content: {
    type: String,
    required: [true, "Please provide your content!"],
  },
  liked_artworks: {
    type: Array,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
