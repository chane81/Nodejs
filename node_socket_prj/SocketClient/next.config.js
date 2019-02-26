const withSass = require('@zeit/next-sass')

module.exports = {
  webpack: function (cfg) {
    const originalEntry = cfg.entry
    cfg.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./polyfills.js')
      ) {
        entries['main.js'].unshift('./polyfills.js');
      }

      return entries
    }

    return cfg
  }
}

// scss 파일 로드되게 세팅
module.exports = withSass();