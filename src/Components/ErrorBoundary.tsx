import React from 'react'

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

  componentDidCatch(_error: any, _info: any) {
    this.setState({ hasError: true })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <section className="bg-danger vh-100 py-4">
        <img
          src="design/images/factory-3.jpeg"
          alt="factory"
          className="img-background img-zoom"
        />
        <div className="container h-100">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <img
                  className="navbar-brand-logo text-center"
                  src="design/images/logo-tynacoon-white.svg"
                  alt="Logo"
                />
              </div>
            </div>
          </div>
          <div className="row h-100 align-items-center">
            <div className="col-sm-6">
              <img src="src/assets/images/spaceman.svg" alt="spaceman" />
            </div>
            <div className="col-sm-6">
              <h1 className="display-1">Error</h1>
              <h3 className="h3">Something went wrong.</h3>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
