import { Outlet, Navigate } from "react-router-dom";
import cookie from "js-cookie"

export const PrivateRouter = () => {
  return cookie.get("token") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export const LogedInRouter = () => {
  return cookie.get("token") ? <Navigate to={"/"} /> : <Outlet />;
};
