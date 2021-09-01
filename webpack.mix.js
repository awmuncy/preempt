const mix = require('laravel-mix');

mix
  .sass('src/styles.scss', "./dist")
  .react('src/app.js', "./dist")
  .copy('src/static/after-page-load.js', "./dist")
  .copy('src/static/before-page-load.js', "./dist")
  .copy('src/static/manifest.json', "./dist")
  .copy('src/static/icon.png', "./dist")
  .copy('src/static/popup.html', "./dist")
  .copy('src/static/background.js', "./dist");