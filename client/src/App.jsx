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
import {useDispatch} from "react-redux"
import React from "react";
import { userAccount } from "./features/User/UserAction";
import ResetPassword from "./components/ResetPassword";
import EditUser from "./components/EditUser";
function App() {
  const dispatch = useDispatch()

  React.useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(userAccount())
    }
  },[dispatch])
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/" index element={<Dashboard />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/userUpdate" element={<EditUser />} />
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
