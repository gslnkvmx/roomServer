const mongoose = require("mongoose");

const PeerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  peerId: {
    type: String,
    required: true,
  },
});

// export model user with UserSchema
module.exports = mongoose.model("peer", PeerSchema);
