const mongoose = require("mongoose");

const User = require("../models/userModel");
const Story = require("../models/StoryModel");

async function toggleBookmark(req, res) {

  try {

    const storyId = req.params.id;

    if (
      !mongoose.Types.ObjectId.isValid(
        storyId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid story id",
      });
    }

    const story = await Story.findById(
      storyId
    );

    if (!story) {

      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    const user = await User.findById(
      req.user._id
    );

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // IMPORTANT FIX
    if (!user.bookmarks) {

      user.bookmarks = [];
    }

    const alreadyBookmarked =
      user.bookmarks.some(
        (id) =>
          id.toString() === storyId
      );

    if (alreadyBookmarked) {

      user.bookmarks =
        user.bookmarks.filter(
          (id) =>
            id.toString() !== storyId
        );

    } else {

      user.bookmarks.push(storyId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      bookmarks: user.bookmarks,
      message: alreadyBookmarked
        ? "Bookmark removed"
        : "Bookmark added",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = toggleBookmark;