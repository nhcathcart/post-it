import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { checkAuth } from "../reducers/loginReducer";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const state = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Additional state to manage authentication status

  useEffect(() => {
    const fetchAuth = async () => {
      // Dispatch the thunk to check authentication status
      await dispatch(checkAuth());
      setLoading(false);
    };

    fetchAuth();
  }, [dispatch]);

  useEffect(() => {
    // Set the isLoggedIn state after the authentication check is completed
    setIsLoggedIn(state.isLoggedIn);
  }, [state.isLoggedIn]);

  if (loading) {
    // Render a loading indicator while waiting for the thunk to complete.
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
