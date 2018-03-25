// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '(dev)',
  serverUrl: '/api',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ],
  firebase: {
    apiKey: "AIzaSyBruCY0Sl4VIZCS5YpEJcslLYWhXGzlgtc",
    authDomain: "algosanddatastructures-3acf6.firebaseapp.com",
    databaseURL: "https://algosanddatastructures-3acf6.firebaseio.com",
    projectId: "algosanddatastructures-3acf6",
    storageBucket: "algosanddatastructures-3acf6.appspot.com",
    messagingSenderId: "266099261743"
  },
  algolia: {
    appId: "N1YAJ7U0GZ",
    searchKey: "d2d1df3ba0ab7610a49b3c24808fbdd5",
    indexName: "data"
  }
};
