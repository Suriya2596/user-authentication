import { Outlet, Navigate } from "react-router-dom";
export const PrivateRouter = () => {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export const LogedInRouter = () => {
  return localStorage.getItem("token") ? <Navigate to={"/"} /> : <Outlet />;
};
