import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import NavbarMenu from "../components/layout/NavbarMenu";

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
            <NavbarMenu></NavbarMenu>
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
