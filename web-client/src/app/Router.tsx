import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainPage } from '../routes/main.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  },
  {
    path: "/welcome",
    element: <MainPage/>,

  }
]);

export const Router: FC = () => <RouterProvider router={router}/>

