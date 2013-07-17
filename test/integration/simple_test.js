// simple_test.js
casper.test.begin('SimpleTest', 1, function suite(test) {

  casper.start(casper.host, function() {
    test.assertExists('title', 'title is present');
  });

  casper.then(function() {
    // More tests after navigating
  });

  casper.run(function() {
    test.done();
  });

});
