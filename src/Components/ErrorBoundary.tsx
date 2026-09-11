import { Component } from 'react'
import errorBackground from '../assets/images/error-background.jpg'
import spaceman from '../assets/images/spaceman.svg'
import { backgroundClassName } from '../utils/theme/backgroundClassName'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
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
      <section
        className={`${backgroundClassName('danger')} flex min-h-screen items-center py-12`}
      >
        <div className="img-zoom-container">
          <img
            src={errorBackground}
            alt="factory"
            className="img-background img-zoom"
          />
        </div>
        <div className="container h-full">
          <div className="flex h-full flex-wrap items-center">
            <div className="w-full sm:w-1/2">
              <img src={spaceman} alt="spaceman" />
            </div>
            <div className="w-full sm:w-1/2">
              <h1 className="display-1">Error</h1>
              <h3 className="text-2xl font-semibold">Something went wrong.</h3>
              <div>
                <button
                  type="button"
                  className="btn-portal border-white bg-white text-gray-800 hover:bg-gray-100"
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
