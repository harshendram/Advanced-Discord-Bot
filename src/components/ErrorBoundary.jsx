import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-red-400 mb-4">
              Oops! Something went wrong
            </h1>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Error Details:
              </h2>
              <p className="text-red-300 mb-4">
                {this.state.error?.toString()}
              </p>
              <details className="mb-4">
                <summary className="cursor-pointer text-cyan-400 hover:text-cyan-300">
                  Stack Trace
                </summary>
                <pre className="mt-2 text-sm text-gray-300 bg-gray-900 p-4 rounded overflow-auto">
                  {this.state.error?.stack}
                </pre>
              </details>
              <details>
                <summary className="cursor-pointer text-cyan-400 hover:text-cyan-300">
                  Component Stack
                </summary>
                <pre className="mt-2 text-sm text-gray-300 bg-gray-900 p-4 rounded overflow-auto">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
              <button
                className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
