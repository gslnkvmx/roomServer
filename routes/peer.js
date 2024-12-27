const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const Peer = require("../models/peer");

/**
 * @method - Post
 * @param - /peer
 * @description - Add a friend
 */

router.post("", auth, async (req, res) => {
  try {
    const { userId, username, peerId } = req.body;
    let peer = await Peer.findOne({
      userId,
    });
    try {
      await Peer.updateOne({ email: email }, { $set: { peerId: peerId } });
    } catch {}

    peer = new Peer({
      userId,
      username,
      peerId,
    });
    await peer.save();
    res.json(peer);
  } catch (e) {
    res.send({ message: e.message });
  }
});

router.get("", auth, async (req, res) => {
  try {
    let userId = req.query.friendId;
    console.log(req.query.friendId);
    const peer = await Peer.findOne({
      userId,
    });

    console.log(peer);
    res.json(peer);
  } catch (e) {
    res.send({ message: e.message });
  }
});

module.exports = router;
