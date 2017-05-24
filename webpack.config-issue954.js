var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

//https://github.com/driftyco/ionic-app-scripts/issues/954
console.log(process.env);

module.exports = {
  //entry: process.env.IONIC_APP_ENTRY_POINT,
  entry: {
    main: './src/app/main.ts',
    vendor: './src/app/vendor.ts'
  },
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    //filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    filename: '[name].js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      },
      {
        test: /\.js$/,
        loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
  ],
  externals: {
    'moment' : 'moment',
    'node-uuid' : 'uuid',
    'localforage' : 'localforage',
    'rxjs': 'Rx',
    '@angular/core' : 'ng.core',
    '@angular/compiler' : 'ng.compiler',
    '@angular/common' : 'ng.common',
    '@angular/http' : 'ng.http',
    '@angular/forms' : 'ng.forms',
    //'@angular/router' : 'ng.router',
    '@angular/platform-browser' : 'ng.platformBrowser' ,
    '@angular/platform-browser-dynamic' : 'ng.platformBrowserDynamic',
    //'ionic-angular' : 'ionicBundle', //external doesnt work - >   probably this { provide: LocationStrategy, useFactory: provideLocationStrategy, deps: [PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()], Config] },

    'ionic-native' :  'IonicNative',
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
