// example.js
casper.test.begin('Home page displays featured posts', 3, function suite(test) {

  casper.start(casper.host, function() {
    test.assertTitleMatch(/Appreciation at Work/i, "Appreciation at Work title is expected");
    test.assertExists('.home-featured-article-read a', "featured article link is found");
    this.click('.home-featured-article-read a');
    // test.assertExists('form[action="/search"]', "main form is found");
    // this.fill('form[action="/search"]', {
    //     q: "casperjs"
    // }, true);
  });

  casper.then(function() {
    test.assertTitleMatch(/3rd Featured Post/i, "article title is expected");
    // test.assertUrlMatch(/q=casperjs/, "search term has been submitted");
    // test.assertEval(function() {
    //     return __utils__.findAll("h3.r").length >= 10;
    // }, "google search for \"casperjs\" retrieves 10 or more results");
  });

  casper.run(function() {
    test.done();
  });

});
