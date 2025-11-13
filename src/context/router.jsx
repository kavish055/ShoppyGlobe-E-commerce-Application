import React, { useEffect, useState } from "react";

const RouterContext = React.createContext();

const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || "/");

  useEffect(() => {
    // Listen to hash changes and update state accordingly
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || "/");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigate by updating the hash, triggering a route change
  const navigate = (path) => {
    window.location.hash = path;
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {/* Consider wrapping children with transition component here for animations */}
      {children}
    </RouterContext.Provider>
  );
};

// Custom hook for using router context
const useRouter = () => {
  const context = React.useContext(RouterContext);
  if (!context) throw new Error("useRouter must be used within Router");
  return context;
};

export { Router, useRouter };
