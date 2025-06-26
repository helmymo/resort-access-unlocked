import React, { createContext, useState, useContext, useMemo } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // The useMemo hook ensures that the context value object is only recreated when isLoading or setIsLoading changes.
  // This optimization prevents unnecessary re-renders of consumers that rely on the stability of the context value.
  const value = useMemo(() => ({ isLoading, setIsLoading }), [isLoading, setIsLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
