class HomePage {
  constructor(browser) {
    this.browser = browser;
    this.url = 'http://automationpractice.multiformis.com';
  }

  elements = {
    searchInput: '#search_query_top',
    searchBtn: 'button[name="submit_search"]',
productNames: "//div[contains(@class, 'right-block')]//h5//a[contains(@class, 'product-name')]",
  };

  async navigate() {
    await this.browser.url(this.url);
    return this;
  }

  async searchFor(term) {
    const b = this.browser;
    const el = this.elements;

    await b.waitForElementVisible(el.searchInput, 3000);
    await b.setValue(el.searchInput, term);
    await b.click(el.searchBtn);

    return this;
  }

  async verifyProductName(expected) {
    const b = this.browser;
    const el = this.elements;

  await b.useXpath().waitForElementVisible(el.productNames, 5000);

  const result = await b.elements('xpath', el.productNames);
    for (let i = 1; i <= result.length; i++) {
    const selector = `(${el.productNames})[${i}]`
    const textResult = await b.getText(selector);
    const actualText = textResult.trim();

    console.log(`Product ${i}: "${actualText}"`);

    const match = actualText.toLowerCase().includes(expected.toLowerCase());

    // Soft assertion (non-throwing)
    b.verify.ok(match, `Product ${i} should contain "${expected}" (case-insensitive). Found: "${actualText}"`);
  }

  await b.useCss();
  return this;
  }
};

module.exports = HomePage;
