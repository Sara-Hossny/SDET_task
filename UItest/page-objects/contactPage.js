// page-objects/contactPage.js
const path = require('path');

class ContactPage {
  constructor(browser) {
    this.browser = browser;
    this.url = 'http://automationpractice.multiformis.com/index.php?controller=contact';
  }

  elements = {
    subjectHeader: '#id_contact',
    emailAddress: '#email',
    orderReference: '#id_order',
    message: '#message',
    fileUpload: '#fileUpload',
    fileSelected: '#uniform-fileUpload',
    sendButton: '#submitMessage',
    successAlert: '.alert-success',
    errorAlert: '.alert-danger',
  };

  async navigate() {
    await this.browser.url(this.url);
    return this;
  }

  async submitForm({ subjectIndex, email, orderRef, message, fileName }) {
    const b = this.browser;
    const el = this.elements;

    await b.waitForElementVisible(el.sendButton, 5000);

    if (subjectIndex) {await b.setValue(el.subjectHeader, subjectIndex);
      
    };
    if (email) await b.setValue(el.emailAddress, email);
    if (orderRef) await b.setValue(el.orderReference, orderRef);
    if (message) await b.setValue(el.message, message);

    if (fileName) {
      const absPath = path.resolve(__dirname, `../test-data/${fileName}`);
      await b.uploadFile(el.fileUpload, absPath);
      await b.waitForElementVisible(el.fileSelected, 2000);
    }

    await b.click(el.sendButton);
    return this;
  }

  async uploadFileAndCheckName(fileName) {
    const b = this.browser;
    const el = this.elements;
    const absPath = path.resolve(__dirname, `../test-data/${fileName}`);

    await b.uploadFile(el.fileUpload, absPath);
    await b.waitForElementVisible(el.fileSelected, 2000);

    await b.getText(el.fileSelected, function (result) {
      b.assert.ok(
        result.value.toLowerCase().includes(fileName.toLowerCase()),
        `Expected uploaded file name to appear, got "${result.value}"`
      );
    });

    return this;
  }

  async submitEmptyForm() {
    const b = this.browser;
    await b.waitForElementVisible(this.elements.sendButton, 2000);
    await b.click(this.elements.sendButton);
    return this;
  }
}

module.exports = ContactPage;
