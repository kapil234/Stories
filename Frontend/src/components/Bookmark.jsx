import {
  useEffect,
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import { Bookmark } from "lucide-react";

import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import SummaryApi from "../common";

function Bookmarks() {

  const [stories, setStories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const {
    setUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // ================= FETCH BOOKMARKS =================

  const fetchBookmarks = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        SummaryApi.User.url,
        {
          method: SummaryApi.User.method,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {

        setStories(
          data.user.bookmarks || []
        );

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load bookmarks"
      );

    } finally {

      setLoading(false);
    }
  };

  // ================= REMOVE BOOKMARK =================

  const removeBookmark = async (
    storyId
  ) => {

    try {

      const response = await fetch(
        `http://localhost:8081/api/stories/bookmark/${storyId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {

        // remove from bookmark page instantly
        setStories((prev) =>
          prev.filter(
            (story) =>
              story._id !== storyId
          )
        );

        // update auth context
        setUser((prev) => ({
          ...prev,
          bookmarks:
            data.bookmarks || [],
        }));

        toast.success(
          "Bookmark removed"
        );

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );
    }
  };

  // ================= LOAD DATA =================

  useEffect(() => {

    fetchBookmarks();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADING */}

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Bookmarks
      </h1>

      {/* LOADING */}

      {loading ? (

        <div className="flex items-center justify-center mt-20">

          <div className="text-xl font-semibold text-gray-600">
            Loading...
          </div>

        </div>

      ) : stories.length === 0 ? (

        // EMPTY STATE

        <div className="flex flex-col items-center justify-center mt-20">

          <div className="bg-white p-10 rounded-3xl shadow-md text-center">

            <Bookmark
              size={60}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-2xl font-semibold text-gray-700">
              No Bookmarks Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Save stories to see them here.
            </p>

            <button
              onClick={() =>
                navigate("/")
              }
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Explore Stories
            </button>

          </div>
        </div>

      ) : (

        // STORIES

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {stories.map((story) => (

            <div
              key={story._id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-2xl transition duration-300"
            >

              {/* TITLE */}

              <h2 className="text-xl font-bold mb-4 text-gray-800 line-clamp-2">
                {story.title}
              </h2>

              {/* STORY INFO */}

              <div className="space-y-2 text-gray-600">

                <p>
                  <span className="font-semibold">
                    Points:
                  </span>{" "}
                  {story.points}
                </p>

                <p>
                  <span className="font-semibold">
                    Author:
                  </span>{" "}
                  {story.author}
                </p>

                <p>
                  <span className="font-semibold">
                    Posted:
                  </span>{" "}
                  {story.postedAt}
                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex items-center justify-between mt-5">

                {/* READ MORE */}

                <button
                  onClick={() =>
                    navigate(
                      `/stories/${story._id}`
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                >
                  Read More
                </button>

                {/* REMOVE BOOKMARK */}

                <button
                  onClick={() =>
                    removeBookmark(
                      story._id
                    )
                  }
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <Bookmark
                    size={26}
                    className="fill-blue-600 text-blue-600"
                  />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;