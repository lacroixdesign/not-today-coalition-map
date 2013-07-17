casper.test.setUp(function() {
  var hostDevelopment = 'http://localhost'; // Development
  var hostStaging     = 'http://localhost'; // Staging
  var hostProduction  = 'http://localhost'; // Production
  casper.host = hostDevelopment;
});

casper.test.done();
