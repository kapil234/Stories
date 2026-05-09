import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import SummaryApi from "../common";

function SingleStory() {
  const { id } = useParams();

  const [story, setStory] =
    useState(null);

  const fetchStory = async () => {
    try {
      const response = await fetch(
        `${SummaryApi.stories.url}/${id}`
      );

      const data =
        await response.json();

      if (data.success) {
        setStory(data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStory();
  }, []);

  if (!story) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full">
        
        <h1 className="text-3xl font-bold mb-4">
          {story.title}
        </h1>

        <p className="mb-2">
          <span className="font-bold">
            Points:
          </span>{" "}
          {story.points}
        </p>

        <p className="mb-2">
          <span className="font-bold">
            Author:
          </span>{" "}
          {story.author}
        </p>

        <p className="mb-4">
          <span className="font-bold">
            Posted:
          </span>{" "}
          {story.postedAt}
        </p>

        <a
          href={story.url}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block"
        >
          Open Original Story
        </a>
      </div>
    </div>
  );
}

export default SingleStory;