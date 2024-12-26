const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const User = require("../models/user");

/**
 * @method - PUT
 * @param - /friend/add
 * @description - Add a friend
 */

router.put("/add", auth, async (req, res) => {
  try {
    const { email } = req.body;
    try {
      friend = await User.findOne({
        email,
      });
    } catch {
      throw new Error("Can't find user with such email.");
    }
    const user = await User.findById(req.user.id);

    // Добавляем нового друга
    friend.friends.push({
      _id: user.id,
      email: user.email,
      status: "pending",
    });

    await user.save();
    await friend.save();

    res.json(friend);
  } catch (e) {
    res.send({ message: e.message });
  }
});

/**
 * @method - PUT
 * @param - /friend/accept
 * @description - accept a friend request
 */

router.put("/accept", auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);
    try {
      sender = user.friends.find(
        (f) => f._id.equals(friendId) && f.status === "pending"
      );
    } catch {
      throw new Error("Can't find pending friend with such id.");
    }

    await User.updateOne(
      { _id: user._id, "friends._id": friendId },
      { $set: { "friends.$.status": "accepted" } }
    );

    sender = await User.findById(friendId);

    sender.friends.push({
      _id: user.id,
      email: user.email,
      status: "accepted",
    });

    await user.save();
    await sender.save();

    res.json(user);
  } catch (e) {
    res.send({ message: e.message });
  }
});

router.put("/refuse", auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);
    try {
      sender = user.friends.find(
        (f) => f._id.equals(friendId) && f.status === "pending"
      );
    } catch {
      throw new Error("Can't find pending friend with such id.");
    }

    await user.friends.pull({ _id: friendId });

    await user.save();

    res.json(user);
  } catch (e) {
    res.send({ message: e.message });
  }
});

module.exports = router;
