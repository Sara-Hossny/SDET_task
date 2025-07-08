// jest.config.js
module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'User API Test Report',
      outputPath: './reports/test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ]
};
