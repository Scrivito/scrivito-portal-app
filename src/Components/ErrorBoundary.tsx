import React from 'react'
import errorBackground from '../assets/images/error-background.jpg'
import spaceman from '../assets/images/spaceman.svg'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <section className="bg-danger vh-100 py-4">
        <img
          src={errorBackground}
          alt="factory"
          className="img-background img-zoom"
        />
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-sm-6">
              <img src={spaceman} alt="spaceman" />
            </div>
            <div className="col-sm-6">
              <h1 className="display-1">Error</h1>
              <h3 className="h3">Something went wrong.</h3>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={window.location.reload}
                >
                  Please try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
