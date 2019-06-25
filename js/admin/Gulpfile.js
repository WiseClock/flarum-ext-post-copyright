var flarum = require('flarum-gulp');

flarum({
  modules: {
    'jc-proplus/post-copyright': [
      'src/**/*.js'
    ]
  }
});
