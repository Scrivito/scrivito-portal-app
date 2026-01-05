import errorBackground from '../../assets/images/error-background.jpg'
import spaceman from '../../assets/images/spaceman.svg'

export function JrPlatformMissingInstance() {
  return (
    <main id="main">
      <section className="bg-danger vh-100 py-5">
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
              <h3 className="h3">The instance ID is missing.</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
