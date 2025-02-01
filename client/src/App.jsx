import {createBrowserRouter, RouterProvider} from "react-router-dom"

import HomePage from "./routes/homePage/HomePage"
import {Layout, RequireAuth} from "./components/layout/Layout"
import ListPage from "./routes/listPage/ListPage"
import SinglePage from "./routes/singlePage/SinglePage"
import Login from "./routes/login/Login"
import ProfilePage from "./routes/profilePage/ProfilePage"
import Register from "./routes/register/Register"
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage"
import NewPostPage from "./routes/newPostPage/NewPostPage"
import {listPageLoader, profilePageLoader, singlePageLoader} from "./lib/loader"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          // dynamic id for each single page
          path: "/:id",
          element: <SinglePage />,

          loader: singlePageLoader,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },

    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
