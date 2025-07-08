const HomePage = require('../page-objects/homePage');
const searchData = require('../test-data/searchData.json'); // Import the JSON data

describe('Search Feature', function () {
  let home;

  beforeEach(async function (browser) {
    home = new HomePage(browser);
    await home.navigate();
  });

  // Dynamically create tests based on the JSON input
  searchData.searchCases.forEach(({ query, expected }) => {
    it(`Search for "${query}" and verify result contains "${expected}"`, async function (browser) {
      await home.searchFor(query);
      await home.verifyProductName(expected);
    });
  });
    after(function (browser) {
    browser.end();
  });
});
