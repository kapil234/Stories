const axios = require("axios");
const cheerio = require("cheerio");
const Story = require("../models/StoryModel");

async function scrapeStories() {

  try {

    let allStories = [];

    // scrape first 5 pages
    for (let page = 1; page <= 5; page++) {

      const { data } = await axios.get(
        `https://news.ycombinator.com/news?p=${page}`
      );

      const $ = cheerio.load(data);

      $(".athing").each((index, element) => {

        const title = $(element)
          .find(".titleline a")
          .text();

        const url = $(element)
          .find(".titleline a")
          .attr("href");

        const subtext = $(element).next();

        const points =
          parseInt(
            subtext.find(".score").text()
          ) || 0;

        const author =
          subtext.find(".hnuser").text();

        const postedAt =
          subtext.find(".age").text();
     

        allStories.push({
          title,
          url,
          points,
          author,
          postedAt,
        });
      });
    }

    await Story.deleteMany();

    await Story.insertMany(allStories);

    console.log(
      `${allStories.length} stories scraped`
    );

  } catch (error) {

    console.log(error.message);
  }
}

module.exports = scrapeStories;