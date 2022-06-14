import {useAuth} from "../../context/authentication/hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  console.log(auth)

  if (auth.ready && !auth.user) {
    return <Navigate to={"login"} state={{ from: location, search: location.search }} />;
  }

  return auth.ready ? children : <CircularProgress/>;
};

export default RequireAuth