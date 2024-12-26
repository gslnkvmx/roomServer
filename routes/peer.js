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
    const { username, email, peerId } = req.body;
    let peer = await Peer.findOne({
      email,
    });
    try {
      await Peer.updateOne({ email: email }, { $set: { peerId: peerId } });
    } catch {}

    peer = new Peer({
      username,
      email,
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
    const { email } = req.body;
    const peer = await Peer.findOne({
      email,
    });

    res.json(peer);
  } catch (e) {
    res.send({ message: e.message });
  }
});

module.exports = router;
