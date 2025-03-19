import { connect, Obj } from 'scrivito'
import { ensureString } from '../../utils/ensureString'
import errorBackground from '../../assets/images/error-background.jpg'
import spaceman from '../../assets/images/spaceman.svg'

export const WrongContentFormat = connect(function WrongContentFormat() {
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
              <h3 className="h3">
                Content format “{ensureString(Obj.root()?.get('contentFormat'))}
                ” not supported.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
})
