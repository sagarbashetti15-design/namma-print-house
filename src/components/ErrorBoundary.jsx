import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    
    // Auto-reload on chunk load error (common when deploying new versions)
    const errorString = error?.message || error?.toString() || '';
    if (
      errorString.includes('Failed to fetch dynamically imported module') ||
      errorString.includes('Importing a module script failed') ||
      errorString.includes('Loading chunk')
    ) {
      // Only reload once to prevent infinite loop
      if (!sessionStorage.getItem('chunk_reloaded')) {
        sessionStorage.setItem('chunk_reloaded', 'true');
        // Force a completely fresh fetch from the server by appending a random query parameter
        const newUrl = window.location.pathname + '?cachebust=' + new Date().getTime();
        window.location.href = newUrl;
        return;
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '3rem', color: '#F8B400', marginBottom: '20px' }}>Oops! Something went wrong.</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px', maxWidth: '600px' }}>
            We're sorry, but the application encountered an unexpected error. Our engineering team has been notified.
          </p>
          <div style={{ backgroundColor: '#222', padding: '15px', borderRadius: '8px', marginBottom: '30px', textAlign: 'left', overflow: 'auto', maxWidth: '800px', width: '100%' }}>
            <p style={{ color: '#ff6b6b', margin: 0, fontFamily: 'monospace' }}>
              <strong>Error:</strong> {this.state.error?.message || this.state.error?.toString()}
            </p>
            {this.state.error?.stack && (
              <pre style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '10px', whiteSpace: 'pre-wrap' }}>
                {this.state.error.stack}
              </pre>
            )}
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              padding: '12px 24px',
              backgroundColor: '#F8B400',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
