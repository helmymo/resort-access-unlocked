import React from 'react';
import { LoadingProvider, useLoading } from '../contexts/LoadingContext';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css'; // Assuming you might want some basic styling

// Global Loading Spinner component
const GlobalSpinner = () => {
  const { isLoading } = useLoading();
  if (!isLoading) return null;
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000, // Ensure it's on top
      padding: '20px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="spinner"></div>
      <span style={{ marginLeft: '10px' }}>Loading...</span>
    </div>
  );
};

// Example component to test ErrorBoundary
const ComponentThatMightError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error("Test error from ComponentThatMightError!");
  }
  return <p>This component is rendered correctly.</p>;
};

// Example component to test Loading state
const ContentComponent = () => {
  const { setIsLoading } = useLoading();

  const simulateApiCall = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically handle the API response
      console.log("Simulated API call finished.");
    }, 2000);
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a basic React application with global error handling and loading states.</p>
      <button onClick={simulateApiCall}>Simulate API Call (2s Loading)</button>
      <hr />
      <h2>Error Boundary Test</h2>
      <p>This component will throw an error to test the ErrorBoundary:</p>
      <ErrorBoundary>
        <ComponentThatMightError shouldThrow={true} />
      </ErrorBoundary>
      <p>If you see this, the error was not caught or the ErrorBoundary is above this text.</p>
      <hr />
      <p>This component will render normally inside an ErrorBoundary:</p>
      <ErrorBoundary>
        <ComponentThatMightError shouldThrow={false} />
      </ErrorBoundary>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <div className="App">
          <GlobalSpinner />
          <ContentComponent />
        </div>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
