import { connect, Obj } from 'scrivito'
import { ensureString } from '../../utils/ensureString'
import errorBackground from '../../assets/images/error-background.jpg'
import spaceman from '../../assets/images/spaceman.svg'
import { backgroundClassName } from '../../utils/theme/backgroundClassName'

export const JrPlatformWrongContentFormat = connect(
  function JrPlatformWrongContentFormat() {
    const contentFormat = ensureString(Obj.root()?.get('contentFormat'))

    return (
      <main id="main">
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
                <h3 className="text-2xl font-semibold">
                  {contentFormat
                    ? `Content format “${contentFormat}” is unsupported.`
                    : 'Missing content format.'}
                </h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  },
)
