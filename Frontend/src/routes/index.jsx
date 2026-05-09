import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import SingleStory from "../components/SingleStory";
import Bookmarks from "../components/Bookmark";
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
             {
        path: "",
        element: <Home/>
      },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/signup",
                element:<Signup/>
            },
            {
              path:"/stories/:id",
              element:<SingleStory/>
            },
            {
                path:"/bookmarks",
                element:<Bookmarks/>
            }
        ]
    }
])
export default router;