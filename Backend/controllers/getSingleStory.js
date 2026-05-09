const Story = require("../models/StoryModel");

async function getSingleStory(req, res) {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Fetch single story",
      success: true,
      data: story,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
}

module.exports = getSingleStory;