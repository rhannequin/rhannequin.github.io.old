require.config({
  baseUrl: 'assets/scripts/',
  deps: ['main'],
  paths: {
    jquery: '../components/jquery/jquery.min',
    backbone: '../components/backbone/backbone-min',
    lodash: '../components/lodash/lodash',
    text: '../components/text/text'
  },
  shim: {
    lodash: {
      exports: '_'
    },
    backbone: {
      deps: ['lodash'],
      exports: 'Backbone'
    }
  }
});