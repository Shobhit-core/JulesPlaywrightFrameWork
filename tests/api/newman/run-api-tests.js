const newman = require('newman');

newman.run({
  collection: require('./../postman/jules-login-tests.postman_collection.json'),
  environment: require('./../postman/env.postman_environment.json'),
  reporters: ['htmlextra'],
  reporter: {
    htmlextra: {
      export: 'reports/api/html-report.html', // Save report here
      logs: true,
      browserTitle: 'API Test Report',
      title: 'Jules AI API Automation Report',
      darkTheme: true
    }
  }
}, function (err) {
  if (err) { throw err; }
  console.log('✅ API tests completed!');
});
