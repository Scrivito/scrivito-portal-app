// Stub implementation for Honeybadger when API key is not available
const Honeybadger = {
  configure: () => ({
    setContext: () => {},
    notify: () => {},
  }),
}

export default Honeybadger
