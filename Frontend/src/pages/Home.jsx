import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import SummaryApi from "../common";

function Home() {

  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 12;

  const { user, setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  // ================= FETCH STORIES =================

  const fetchStories = async (
    currentPage = 1
  ) => {

    try {

      setLoading(true);

      const response = await fetch(
        `${SummaryApi.stories.url}?page=${currentPage}&limit=${limit}`,
        {
          method:
            SummaryApi.stories.method,
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (data.success) {

        setStories(data.data || []);

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  // ================= BOOKMARK =================

  const handleBookmark = async (
    e,
    storyId
  ) => {

    e.stopPropagation();

    if (!user) {

      toast.warning(
        "Please login first"
      );

      navigate("/login");

      return;
    }

    try {

      const response = await fetch(
        `${SummaryApi.bookmark.url}/${storyId}`,
        {
          method:
            SummaryApi.bookmark.method,
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (data.success) {

        setUser((prev) => ({
          ...prev,
          bookmarks:
            data.bookmarks || [],
        }));

        toast.success(data.message);

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

  // ================= PAGINATION =================

  const nextPage = () => {

    if (stories.length === limit) {

      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {

    if (page > 1) {

      setPage((prev) => prev - 1);
    }
  };

  // ================= USE EFFECT =================

  useEffect(() => {

    fetchStories(page);

  }, [page]);

  // ================= BOOKMARKS =================

  const bookmarks =
    user?.bookmarks || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= HEADING ================= */}

      <h1 className="text-4xl font-bold text-center mb-10">
        Hacker News Stories
      </h1>

      {/* ================= LOADING ================= */}

      {loading ? (

        <div className="flex justify-center items-center h-[60vh]">

          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>

        </div>

      ) : (

        <>
          {/* ================= EMPTY STATE ================= */}

          {stories.length === 0 ? (

            <div className="text-center text-2xl font-semibold mt-20">
              No stories found
            </div>

          ) : (

            <>
              {/* ================= STORIES ================= */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {stories.map((story) => {

                  const isBookmarked =
                    bookmarks.some(
                      (item) =>
                        (
                          item._id ||
                          item
                        )
                          .toString() ===
                        story._id.toString()
                    );

                  return (

                    <div
                      key={story._id}
                      onClick={() =>
                        navigate(
                          `/stories/${story._id}`
                        )
                      }
                      className="cursor-pointer bg-white rounded-2xl shadow-md p-5 hover:shadow-2xl transition duration-300"
                    >

                  

                      <h2 className="text-xl font-bold mb-4 line-clamp-2">
                        {story.title}
                      </h2>

                   

                      <div className="text-gray-600 space-y-2">

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

                   

                      <div className="flex justify-between items-center mt-6">

                    

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

                     

                        <button
                          onClick={(e) =>
                            handleBookmark(
                              e,
                              story._id
                            )
                          }
                          className="p-2 rounded-full hover:bg-gray-100 transition"
                        >

                          <Bookmark
                            size={28}
                            className={
                              isBookmarked
                                ? "fill-blue-600 text-blue-600"
                                : "text-gray-500"
                            }
                          />

                        </button>

                      </div>

                    </div>
                  );
                })}
              </div>

              

              <div className="flex justify-center items-center gap-6 mt-12">

    

                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className={`p-3 rounded-full shadow transition ${
                    page === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-white hover:bg-gray-200"
                  }`}
                >
                  <ChevronLeft size={24} />
                </button>

              

                <div className="text-2xl font-bold">
                  {page}
                </div>

             

                <button
                  onClick={nextPage}
                  disabled={
                    stories.length < limit
                  }
                  className={`p-3 rounded-full shadow transition ${
                    stories.length < limit
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-white hover:bg-gray-200"
                  }`}
                >
                  <ChevronRight size={24} />
                </button>

              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;