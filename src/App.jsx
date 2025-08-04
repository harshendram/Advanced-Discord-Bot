import React, { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Installation from "./components/Installation";
import FeaturesGallery from "./components/FeaturesGallery";
import TechStack from "./components/TechStack";
import ExpressionBalls from "./components/ExpressionBalls";
import Footer from "./components/Footer";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
      <p className="text-white">Loading...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <div className="relative">
        {/* Global Snowfall Effect */}
        <ErrorBoundary>
          <ExpressionBalls />
        </ErrorBoundary>

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Navbar />
          </ErrorBoundary>

          <ErrorBoundary>
            <About />
          </ErrorBoundary>

          <ErrorBoundary>
            <Installation />
          </ErrorBoundary>

          <ErrorBoundary>
            <FeaturesGallery />
          </ErrorBoundary>

          <ErrorBoundary>
            <TechStack />
          </ErrorBoundary>

          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default App;
