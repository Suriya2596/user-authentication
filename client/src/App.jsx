// import React from 'react'
import "./App.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Page404 from "./routes/Page404";
import Dashboard from "./Pages/Dashboard";
import { LogedInRouter, PrivateRouter } from "./routes/PrivateRouter";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/" index element={<Dashboard />} />
        </Route>
        <Route element={<LogedInRouter />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
