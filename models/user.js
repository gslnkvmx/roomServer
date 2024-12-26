const mongoose = require("mongoose");

const FriendSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["accepted", "pending", "rejected"],
    default: "pending",
  },
});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  friends: [FriendSchema],
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
