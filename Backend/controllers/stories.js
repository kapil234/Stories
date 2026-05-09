const Story = require("../models/StoryModel");


async function getStories(req, res) {

  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const stories =
      await Story.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalStories =
      await Story.countDocuments();

    res.status(200).json({
      success: true,

      data: stories,

      currentPage: page,

      totalPages: Math.ceil(
        totalStories / limit
      ),

      totalStories,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getStories;

