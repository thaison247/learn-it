import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import NavBarMenu from "../components/layout/NavBarMenu";

function ProtectedRoute({ component: Component, ...rest }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavBarMenu></NavBarMenu>
            <Component {...rest} {...props} />
          </>
        ) : (
          <>
            <Redirect to="/login" />
          </>
        )
      }
    />
  );
}

export default ProtectedRoute;
