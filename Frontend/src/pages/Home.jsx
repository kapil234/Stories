import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import SummaryApi from "../common";

function Home() {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 12;

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ================= FETCH STORIES =================
  const fetchStories = async (currentPage = 1) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${SummaryApi.stories.url}?page=${currentPage}&limit=${limit}`,
        {
          method:SummaryApi.stories.method,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setStories(data.data || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= BOOKMARK =================
  const handleBookmark = async (storyId) => {
    if (!user) {
      toast.warning("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${SummaryApi.bookmark.url}/${storyId}`,
        {
          method: SummaryApi.bookmark.method,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        // ✅ safer update
        setUser((prev) => ({
          ...prev,
          bookmarks: data.bookmarks || [],
        }));

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // ================= PAGINATION=================
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

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  const bookmarks = user?.bookmarks || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADING */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        Hacker News Stories
      </h1>

      {/* LOADING */}
      {loading ? (
        <div className="text-center text-lg font-semibold">
          Loading...
        </div>
      ) : (
        <>
          {/* STORIES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {stories.map((story) => {
              const isBookmarked = bookmarks.some(
                (item) =>
                  (item._id || item).toString() === story._id.toString()
              );

              return (
                <div
                  key={story._id}
                  className="bg-white rounded-2xl shadow-md p-5 hover:shadow-2xl transition"
                  onClick={() => navigate(`/stories/${story._id}`)}
                >
                  <h2 className="text-xl font-bold mb-4">
                    {story.title}
                  </h2>

                  <div className="text-gray-600 space-y-2">
                    <p>Points: {story.points}</p>
                    <p>Author: {story.author}</p>
                    <p>Posted: {story.postedAt}</p>
                  </div>

                  <div className="flex justify-between items-center mt-5">

                    <button
                      onClick={() =>
                        navigate(`/stories/${story._id}`)
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                      Read More
                    </button>

                    <button
                      onClick={(e) =>{e.stopPropagation();
                         handleBookmark(story._id)}}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <Bookmark
                        size={26}
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

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-6 mt-10">

            <button
              onClick={prevPage}
              disabled={page === 1}
              className={`p-3 rounded-full shadow ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="text-xl font-bold">{page}</div>

            <button
              onClick={nextPage}
              disabled={stories.length < limit}
              className={`p-3 rounded-full shadow ${
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
    </div>
  );
}

export default Home;