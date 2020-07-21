// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
exports.config = {
  debug: false,
  allScriptsTimeout: 45000,
  capabilities: {
    'browserName': 'chrome'
  },
  specs: [
    './e2e/features/**/*.feature'
  ],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    strict: true,
    require: [
      './e2e/steps/**/*.steps.ts'
    ],
    format: [
      'json:test-reports/cucumber-test-results.json'
    ]
  },
  params: {
    pagePaths: {
      searchpage: '',
      homepage: 'home'
    }
  },

  onPrepare() {
    const path  = require('path');
    const mkdirp =  require('mkdirp');
    const fs = require('fs');
    let dir = 'test-reports';

    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
    require('ts-node').register({
      project: path.join(__dirname, 'e2e' , 'tsconfig.e2e.json')
    });
    global['vars'] = {};
  }
};
